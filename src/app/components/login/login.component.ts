import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { provideRoutes, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { LoginResponse } from '../../models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../models/role.model';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ,ToastModule ,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', Validators.required),
  });
  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.authService.login(username, password).subscribe({
        next: (response: LoginResponse): void => {
          localStorage.setItem('authToken', response.data.jwtToken);
          const decodedToken: { role: Role; sub: string; iat: number; exp: number } = jwtDecode(response.data.jwtToken);
          this.authService.role$.set(decodedToken.role)
          this.authService.loggedInUserName$.set(decodedToken.sub)
          // this.authService.role$.set(response.role);
          this.authService.loggedIn$.set(true);
          // this.loading = false;
          this.messageService.add({severity:'SUCCESS', detail: response.message})
          if(decodedToken.role == "ROLE_ADMIN")
          {
            console.log("Hi")
            this.router.navigate(['/admin/home']);
          }
          else
          {
            this.router.navigate(['/home'])
          }
         
          
        },
        error: (error: HttpErrorResponse): void => {
          
        },
      });
    }
  }
}
