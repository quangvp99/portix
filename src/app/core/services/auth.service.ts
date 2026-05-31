import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getAccessToken();
    if (token) {
      // Verify token validity in production
      // If invalid, clear storage
    }
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response, request.rememberMe)),
        catchError(error => {
          console.error('Login failed:', error);
          return throwError(() => error);
        })
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response, false)),
        catchError(error => {
          console.error('Registration failed:', error);
          return throwError(() => error);
        })
      );
  }

  forgotPassword(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email })
      .pipe(
        catchError(error => {
          console.error('Forgot password failed:', error);
          return throwError(() => error);
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, { token, newPassword })
      .pipe(
        catchError(error => {
          console.error('Reset password failed:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.clearAuth();
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh-token`, { refreshToken })
      .pipe(
        tap(response => this.handleAuthResponse(response, false)),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private handleAuthResponse(response: AuthResponse, rememberMe?: boolean): void {
    sessionStorage.setItem('accessToken', response.accessToken);
    
    if (rememberMe) {
      localStorage.setItem('refreshToken', response.refreshToken);
    } else {
      sessionStorage.setItem('refreshToken', response.refreshToken);
    }
    
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private clearAuth(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}
