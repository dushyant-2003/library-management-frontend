import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Role } from '../../models/role.model';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [NgIf],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  role: string = ''
  constructor(private router: Router, private authService: AuthService) {
    this.role = this.authService.role$()
    console.log(this.role)
  }
  title: string = 'पुस्तकालय';
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);

  }

  navigateToUser() {
    if(this.role === Role.admin) {
      this.router.navigate(['/admin/user'])
    }
    else {
      this.router.navigate(['/home'])
    }
  }
  navigateToBook() {
    if(this.role === Role.admin) {
      this.router.navigate(['/admin/book'])
    }
    else {
      this.router.navigate(['/book'])
    }
    
  }
  navigateToNotification() {
    if(this.role === Role.admin) {
      this.router.navigate(['/admin/notification'])
    } 
    else {
      this.router.navigate(['/notification'])
    }
    
  }
  navigateToHome() {
    if(this.role === Role.admin) {
      this.router.navigate(['/admin/home'])
    } 
    else {
      this.router.navigate(['/dashboard'])
    }
  }
  navigateToProfile() {
    if(this.role === Role.admin) {
      this.router.navigate(['/admin/profile'])
    } 
    else {  
      this.router.navigate(['/profile'])
    }
  }
  navigateToFine() {
    this.router.navigate(['/fine'])
  }
}
