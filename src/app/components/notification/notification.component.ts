import { DatePipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
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
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../../services/auth.service';
import { Notification } from '../../models/notification.model';


@Component({
  selector: 'app-notification',
  imports: [ ReactiveFormsModule, NgIf,NgFor,
   DialogModule ,FormsModule,
   ButtonModule, InputTextModule,
    DropdownModule, HeaderComponent, NgClass, ConfirmDialogModule, DatePipe],

  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  providers: [MessageService, ConfirmationService]
})

export class NotificationComponent {

  users: User[] = []
  notifications: Notification[] = []
  filteredUsers = [...this.users]
  searchUserText: string = ''
  userName: string = ''
  addNotificationForm: FormGroup;
  displayModal: boolean = false;
  isFormActive: boolean = false
  isFormDisabled: boolean = true
  role: string = ''
  loggedInUserName: string = ''
  constructor(private userService: UserService, private notificationService: NotificationService, private fb: FormBuilder, private authServie: AuthService) {


    this.addNotificationForm = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
    this.userName = ''
    
  }

  ngOnInit() {
    this.role = this.authServie.role$()
    this.loggedInUserName = this.authServie.loggedInUserName$()
  }
  showSendNotificationModal(userName: string) {
    this.displayModal = true;
    this.isFormActive = true;
    this.isFormDisabled = false;
    this.userName = userName
  }
  onCloseDialog() {
    this.displayModal = false; 
    this.isFormActive = false;
    this.isFormDisabled = true;
    this.userName = '' 
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
  filterUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(this.searchUserText.toLowerCase())
    );
  }
  sendNotification() {
    const notificationData = this.addNotificationForm.value;
    notificationData.userName = this.userName;
    
    this.notificationService.sendNotification(notificationData).subscribe(
      (resposne) => {
    
        console.log(resposne.message)
        this.onCloseDialog()
      },
      (error) => {

      }
    )
 
  }
  readNotification() {
    this.notificationService.readNotification(this.loggedInUserName).subscribe(
      (response) => {
        this.notifications = response.data
      },
      (error) => {

      }
    )
  }

}
