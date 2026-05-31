import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Unauthorized - token expired or invalid
        authService.logout();
        router.navigate(['/auth/login']);
      } else if (error.status === 403) {
        // Forbidden
        router.navigate(['/dashboard']);
      } else if (error.status === 0) {
        // Network error
        console.error('Network error:', error);
      }

      return throwError(() => error);
    })
  );
};
