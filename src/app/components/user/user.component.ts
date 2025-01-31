import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { HeaderComponent } from '../header/header.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastrService } from 'ngx-toastr';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-user',
  imports: [ ReactiveFormsModule, NgIf,NgFor,
   DialogModule ,FormsModule,
   ButtonModule, InputTextModule,
    DropdownModule, HeaderComponent, NgClass, ConfirmDialogModule, Paginator, PaginatorModule],

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UserComponent {
  users: User[] = []; // Store multiple users
  filteredUsers = [...this.users]
  addUserForm: FormGroup;
  displayModal: boolean = false;
  isFormActive: boolean = false
  isFormDisabled: boolean = true
  searchUserText: string = ''
  page: number = 1;
  size: number = 1;
  totalElements: number = 10;
  totalPages: number = 5;
  constructor(private toastr: ToastrService, private userService:  UserService,private fb: FormBuilder,private messageService: MessageService,private confirmationService: ConfirmationService) {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  showAddUserModal() {
    this.displayModal = true;
    this.isFormActive = true;
    this.isFormDisabled = false;
  }
  onCloseDialog() {
    this.displayModal = false; 
    this.isFormActive = false;
    this.isFormDisabled = true; 
  }
  onSubmit() {
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;

      this.userService.addUser(userData).subscribe(
        (response) => {
          this.toastr.success(userData.message, userData.status, {
            timeOut: 2000,
            progressBar: true,
           
          });
          userData.bookIssueLimit = 3
          userData.fine = 0
          this.filteredUsers = [...this.filteredUsers, userData]
         
          this.addUserForm.reset();
        },
        (error) => {
          this.toastr.error(error.error.message, "Failure", {
            timeOut: 2000,
            progressBar: true,
          });
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  


  showUserDetails(): void {
    // Simulate fetching multiple user data
    this.userService.getAllUsersPagniated(this.page,this.size).subscribe({
      next: (userData: UserResponse) => {
        this.toastr.success(userData.message, userData.status, {
          timeOut: 2000,
          progressBar: true,
         
        });
        this.users = userData.data;
        this.filteredUsers = [... this.users]
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message, "Failure", {
          timeOut: 2000,
          progressBar: true,
        });
      },
    });
  }

  deleteUser(userId: string): void {
    
    
      
      this.userService.deleteUser(userId).subscribe({
        next: (response) => {
          this.toastr.success(response.message, response.status, {
            timeOut: 2000,
            progressBar: true,
           
          });
        },
        error: (error) => {
          this.toastr.error(error.error.message, "Failure", {
            timeOut: 2000,
            progressBar: true,
          });
        }
      });

    


  }

filterUsers() {
  this.filteredUsers = this.users.filter((user) =>
    user.name.toLowerCase().includes(this.searchUserText.toLowerCase())
  );
}

onPageChange(event: PaginatorState): void {
  console.log(event);
  this.page = event.page! + 1;
  this.showUserDetails();
}
}
