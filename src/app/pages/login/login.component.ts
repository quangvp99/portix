import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="login-container">
      <div class="login-background">
        <div class="gradient-blob blob-1"></div>
        <div class="gradient-blob blob-2"></div>
        <div class="gradient-blob blob-3"></div>
      </div>

      <div class="login-content">
        <div class="login-card">
          <div class="login-header">
            <div class="login-logo">📊</div>
            <h1>Stock Portfolio Manager</h1>
            <p>Manage your investments with confidence</p>
          </div>

          <form (ngSubmit)="onLogin()" class="login-form">
            <div class="form-group">
              <label for="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="you@example.com"
                [(ngModel)]="email"
                name="email"
                required
                class="form-input">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••"
                [(ngModel)]="password"
                name="password"
                required
                class="form-input">
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
                <span>Remember me</span>
              </label>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <app-button 
              variant="primary" 
              type="submit"
              class="login-button"
              (click)="onLogin()">
              Sign In
            </app-button>
          </form>

          <div class="login-footer">
            <p>Don't have an account? <a href="#" class="signup-link">Create one</a></p>
          </div>
        </div>

        <div class="login-info">
          <div class="info-card">
            <span class="info-icon">📈</span>
            <h3>Real-time Data</h3>
            <p>Track live stock prices and market updates</p>
          </div>
          <div class="info-card">
            <span class="info-icon">💼</span>
            <h3>Portfolio Management</h3>
            <p>Manage multiple portfolios effortlessly</p>
          </div>
          <div class="info-card">
            <span class="info-icon">📊</span>
            <h3>Advanced Analytics</h3>
            <p>Deep insights into your investments</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      width: 100%;
      min-height: 100vh;
      background-color: var(--bg-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .login-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      z-index: 0;
    }

    .gradient-blob {
      position: absolute;
      border-radius: 50%;
      opacity: 0.05;
      mix-blend-mode: screen;
      filter: blur(100px);
    }

    .blob-1 {
      width: 500px;
      height: 500px;
      background: linear-gradient(135deg, var(--primary-green), var(--accent-blue));
      top: -100px;
      right: -100px;
    }

    .blob-2 {
      width: 400px;
      height: 400px;
      background: linear-gradient(135deg, var(--accent-blue), var(--primary-green));
      bottom: -100px;
      left: -100px;
    }

    .blob-3 {
      width: 300px;
      height: 300px;
      background: linear-gradient(135deg, var(--loss), var(--primary-green));
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .login-content {
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-3xl);
      max-width: 1000px;
      width: 90%;
      padding: var(--spacing-xl);
    }

    .login-card {
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: var(--spacing-3xl);
      box-shadow: var(--shadow-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .login-header {
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .login-logo {
      font-size: 48px;
      margin-bottom: var(--spacing-md);
    }

    .login-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
    }

    .login-header p {
      font-size: var(--font-size-body);
      color: var(--text-secondary);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .form-group label {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    .form-input {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--font-size-body);
      font-family: var(--font-family);
      transition: all 0.3s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input::placeholder {
      color: var(--text-muted);
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--font-size-body);
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      cursor: pointer;
      color: var(--text-secondary);
      user-select: none;
    }

    .remember-me input {
      cursor: pointer;
      accent-color: var(--primary-green);
    }

    .forgot-password {
      color: var(--accent-blue);
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .forgot-password:hover {
      text-decoration: underline;
    }

    .login-button {
      width: 100%;
    }

    .login-footer {
      text-align: center;
      font-size: var(--font-size-body);
      color: var(--text-secondary);
    }

    .signup-link {
      color: var(--primary-green);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      transition: all 0.3s ease;
    }

    .signup-link:hover {
      text-decoration: underline;
    }

    .login-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
      justify-content: center;
    }

    .info-card {
      background-color: rgba(34, 197, 94, 0.05);
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      transition: all 0.3s ease;
    }

    .info-card:hover {
      background-color: rgba(34, 197, 94, 0.1);
      border-color: var(--primary-green);
      transform: translateY(-4px);
    }

    .info-icon {
      font-size: 32px;
    }

    .info-card h3 {
      font-size: var(--font-size-h4);
      color: var(--text-primary);
    }

    .info-card p {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
      line-height: 1.6;
    }

    @media (max-width: 1024px) {
      .login-content {
        grid-template-columns: 1fr;
        max-width: 600px;
      }

      .login-info {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-lg);
      }
    }

    @media (max-width: 768px) {
      .login-card {
        padding: var(--spacing-xl);
      }

      .login-info {
        grid-template-columns: 1fr;
      }

      .blob-1, .blob-2, .blob-3 {
        display: none;
      }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.email && this.password) {
      this.router.navigate(['/dashboard']);
    }
  }
}
