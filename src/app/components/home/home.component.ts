import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UserComponent } from '../user/user.component';
import { NgFor, NgStyle } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NgFor, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent {
  cards = [
    {
      title: 'User Management',
      description: 'Manage user details',
      image: 'assets/images/user-management-icon.jpg',
      route: '/admin/user'
    },
    {
      title: 'Book Management',
      description: 'Manage book inventory, issues, and returns.',
      image: 'assets/images/book-management-icon.jpg',
      route: '/admin/book'
    },
    {
      title: 'Notification Management',
      description: 'Send and manage notifications for users.',
      image: 'assets/images/notification-management-icon.jpg',
      route: '/admin/notification'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
