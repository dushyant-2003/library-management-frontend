import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { HeaderComponent } from '../header/header.component';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { User, UserData } from '../../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, CurrencyPipe],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user: User | null= null
  constructor(private authService: AuthService, private userService: UserService) { 
     
    }

  ngOnInit() {
    
    const token = localStorage.getItem('authToken')
    if(!token) {
      return;
    }
    const decodedToken: { role: string; sub: string; iat: number; exp: number } = jwtDecode(token)
    this.userService.getUser(decodedToken.sub).subscribe({
      next: (userData: UserData) => {
        this.user = userData.data
        console.log(this.user)
      },
      error: (error: HttpErrorResponse) => {
      }
    })
    // console.log(this.user)
  }
}

