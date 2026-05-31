import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  if (token && !isAuthUrl(req.url)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

function isAuthUrl(url: string): boolean {
  return url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/forgot-password');
}
