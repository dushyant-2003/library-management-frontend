import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { provideRoutes, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { LoginResponse } from '../../models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../models/role.model';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../loading/loading.component';
import { consumerAfterComputation } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule ,ToastModule, NgClass ,LoadingComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent {
  passwordFieldType: string = 'password';
  isLoading: boolean = false
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private toastr: ToastrService
  ) {}

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', Validators.required),
  });


  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.isLoading = true;

  this.authService.login(username, password).subscribe({
    next: (response: LoginResponse): void => {
      this.isLoading = false
      localStorage.setItem('authToken', response.data.jwtToken);
      const decodedToken: { role: Role; sub: string; iat: number; exp: number } = jwtDecode(response.data.jwtToken);
      this.authService.role$.set(decodedToken.role)
      this.authService.loggedInUserName$.set(decodedToken.sub)
      // this.authService.role$.set(response.role);
      this.authService.loggedIn$.set(true);
      // this.loading = false;
     // this.toastr.success(response.message)
     this.toastr.success(response.message, response.status, {
      timeOut: 2000,
      progressBar: true,
     
    });
      if(decodedToken.role == "ROLE_ADMIN")
      {
        console.log("Hi")
        this.router.navigate(['/admin/home']);
      }
      else
      {
        this.router.navigate(['/dashboard'])
      }
     
      
    },
    error: (error: HttpErrorResponse): void => {
      this.isLoading = false
      console.log(error)
      this.toastr.error(error.error.message, "Failure", {
        timeOut: 2000,
        progressBar: true,
        
      });
    },
  });

     
    }
  }
}
