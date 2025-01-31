import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { User, UserData } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-fine',
  imports: [HeaderComponent, ButtonModule,ReactiveFormsModule, NgIf,NgFor,
    DialogModule ,FormsModule,
    ButtonModule, InputTextModule,
     DropdownModule, NgClass, ConfirmDialogModule],
  templateUrl: './fine.component.html',
  styleUrl: './fine.component.scss'
})
export class FineComponent {
   user: User | null= null
   displayModal: boolean = false;
  isFormActive: boolean = false
  isFormDisabled: boolean = true
    constructor(private authService: AuthService, private userService: UserService, private toastr: ToastrService) { 
       
      }
  
    seeFines() {
      
      const token = localStorage.getItem('authToken')
      if(!token) {
        return;
      }
      const decodedToken: { role: string; sub: string; iat: number; exp: number } = jwtDecode(token)
      this.userService.getUser(decodedToken.sub).subscribe({
        next: (userData: UserData) => {
          this.user = userData.data
          if(this.user.fine === 0) {
            this.toastr.info("No pending dues", 'INFO', {
              timeOut: 2000,
              progressBar: true,
            });
          }
          else {
            this.showPayFineModel()
          }
          
        },
        error: (error: HttpErrorResponse) => {

        }
      })
    }
    onCloseDialog() {
      this.displayModal = false; 
      this.isFormActive = false;
      this.isFormDisabled = true;
    }
    showPayFineModel() {
      this.displayModal = true;
      this.isFormActive = true;
      this.isFormDisabled = false;
    }
}
