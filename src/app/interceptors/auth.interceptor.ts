import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
  // Array of pathsthat don't require authentication
  
  private readonly publicPaths = [
    '/login'
  ];
 
  // Use dependency injection context to avoid constructor injection
  private router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isPublicPath = this.publicPaths.some((path) =>
      req.url.includes(path)
    );

    const token = localStorage.getItem('authToken');
    console.log('Intercepted request:', req);

    if (isPublicPath) {
      return next.handle(req);
    }

    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
console.log(clonedReq)
    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

