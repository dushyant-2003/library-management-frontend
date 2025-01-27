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

@Component({
  selector: 'app-user',
  imports: [ ReactiveFormsModule, NgIf,NgFor,
   DialogModule ,FormsModule,
   ButtonModule, InputTextModule,
    DropdownModule, HeaderComponent, NgClass, ConfirmDialogModule],

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
  constructor(private userService:  UserService,private fb: FormBuilder,private messageService: MessageService,private confirmationService: ConfirmationService) {
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
          console.log('User added successfully', response.message);
          userData.bookIssueLimit = 3
          userData.fine = 0
          this.filteredUsers = [...this.filteredUsers, userData]
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Added Successfully' });
          this.addUserForm.reset();
        },
        (error) => {
          console.error('Error adding user', error);
          alert('Error adding user. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  

  showUserDetails(): void {
    // Simulate fetching multiple user data
    this.userService.getAllUsers().subscribe({
      next: (userData: UserResponse) => {
        this.users = userData.data;
        this.filteredUsers = [... this.users]
      },
      error: (error: HttpErrorResponse) => {
       // this.toastService.showError(error.error.message);
      },
    });
  }

  deleteUser(userId: string): void {
    
    if (confirm('Are you sure you want to delete this user?')) {
      
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.filteredUsers = this.filteredUsers.filter(user => user.userId !== userId); // Remove user from the list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete the user');
        }
      });


    }
//   this.confirmationService.confirm({
   
//     message: 'Do you want to delete this record?',
//     header: 'Danger Zone',
//     icon: 'pi pi-info-circle',
//     rejectLabel: 'Cancel',
//     rejectButtonProps: {
//         label: 'Cancel',
//         severity: 'secondary',
//         outlined: true,
//     },
//     acceptButtonProps: {
//         label: 'Delete',
//         severity: 'danger',
//     },

//     accept: () => {
  // this.userService.deleteUser(userId).subscribe({
  //   next: () => {
  //     alert('User deleted successfully');
  //     this.filteredUsers = this.filteredUsers.filter(user => user.userId !== userId); // Remove user from the list
  //   },
  //   error: (error) => {
  //     console.error('Error deleting user:', error);
  //     alert('Failed to delete the user');
  //   }
  // });
       
//     },
//     reject: () => {
//     }
// });

  }

filterUsers() {
  this.filteredUsers = this.users.filter((user) =>
    user.name.toLowerCase().includes(this.searchUserText.toLowerCase())
  );
}

}
