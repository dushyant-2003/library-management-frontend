import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Role } from '../../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.authService.role$(); // Use the role signal from AuthService

    if (userRole === "ROLE_ADMIN") {
        
      return true; 
    }

    // Redirect to an appropriate route if the user is not an admin
    this.router.navigate(['/login']);
    return false;
  }
}
