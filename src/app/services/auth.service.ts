import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/auth.model'; 
import { BASE_URL } from '../shared/constants/constants';
import { signal } from '@angular/core';
import { Role } from '../models/role.model';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'

})
export class AuthService {

  user$ = signal<User | null>(null);
  loggedIn$ = signal<boolean>(this.hasValidToken());
  loggedInUserName$ = signal<string>('') 
  role$ = signal<Role>(Role.user);
  forgotPasswordEmail$ = signal<string>('');
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<LoginResponse> {
    const loginPayload = { userName, password };
    return this.http.post<LoginResponse>(`${BASE_URL}/auth/login`, loginPayload);
  }
  private hasValidToken(): boolean {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return false;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      // Check if the token has expired
      return decodedToken.exp > currentTime;
    } catch (error) {
      // In case of any error (invalid token format, decoding issues), treat it as invalid
      return false;
    }
  }
}
