import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ButtonComponent],
  template: `
    <div class="profile">
      <div class="profile-header">
        <h1>Account Settings</h1>
        <p class="subtitle">Manage your profile and preferences</p>
      </div>

      <!-- Profile Information -->
      <app-card class="profile-card">
        <div class="card-header">
          <h2>Personal Information</h2>
          <button class="edit-btn" (click)="toggleEditMode()">
            {{ isEditMode ? '✕ Cancel' : '✏️ Edit' }}
          </button>
        </div>

        <div class="profile-content">
          <div class="avatar-section">
            <div class="avatar">QT</div>
            <div class="avatar-actions">
              <button class="avatar-btn">Upload Photo</button>
              <button class="avatar-btn">Remove</button>
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" [(ngModel)]="profile.fullName" [disabled]="!isEditMode">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" [(ngModel)]="profile.email" [disabled]="!isEditMode">
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" [(ngModel)]="profile.phone" [disabled]="!isEditMode">
            </div>
            <div class="form-group">
              <label>Account Status</label>
              <select [disabled]="!isEditMode">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div *ngIf="isEditMode" class="form-actions">
            <app-button variant="primary" (click)="saveProfile()">Save Changes</app-button>
            <app-button variant="secondary" (click)="toggleEditMode()">Cancel</app-button>
          </div>
        </div>
      </app-card>

      <div class="settings-grid">
        <!-- Security Settings -->
        <app-card>
          <h2>Security</h2>
          <div class="setting-list">
            <div class="setting-row">
              <div class="setting-info">
                <span class="setting-title">Password</span>
                <span class="setting-desc">Change your password regularly</span>
              </div>
              <button class="setting-btn">Change</button>
            </div>
            <div class="setting-row">
              <div class="setting-info">
                <span class="setting-title">Two-Factor Authentication</span>
                <span class="setting-desc">Add extra security to your account</span>
              </div>
              <button class="setting-btn">{{ twoFactorEnabled ? 'Disable' : 'Enable' }}</button>
            </div>
            <div class="setting-row">
              <div class="setting-info">
                <span class="setting-title">Active Sessions</span>
                <span class="setting-desc">Manage your active sessions</span>
              </div>
              <button class="setting-btn">Manage</button>
            </div>
          </div>
        </app-card>

        <!-- Notification Preferences -->
        <app-card>
          <h2>Notifications</h2>
          <div class="toggle-list">
            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-title">Email Alerts</span>
                <span class="toggle-desc">Get notified about portfolio changes</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="notifications.emailAlerts">
                <span class="switch"></span>
              </label>
            </div>
            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-title">Price Alerts</span>
                <span class="toggle-desc">Get notified when prices reach targets</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="notifications.priceAlerts">
                <span class="switch"></span>
              </label>
            </div>
            <div class="toggle-row">
              <div class="toggle-info">
                <span class="toggle-title">Transaction Alerts</span>
                <span class="toggle-desc">Receive alerts after transactions</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" [(ngModel)]="notifications.transactionAlerts">
                <span class="switch"></span>
              </label>
            </div>
          </div>
        </app-card>
      </div>

      <!-- Danger Zone -->
      <app-card class="danger-zone">
        <h2>Danger Zone</h2>
        <div class="danger-actions">
          <div class="danger-item">
            <div class="danger-info">
              <span class="danger-title">Delete Account</span>
              <span class="danger-desc">Permanently delete your account and all associated data</span>
            </div>
            <app-button variant="danger">Delete Account</app-button>
          </div>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .profile {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
      max-width: 1000px;
    }

    .profile-header {
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .profile-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }

    .subtitle {
      color: var(--text-secondary);
    }

    .profile-card {
      width: 100%;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .card-header h2 {
      font-size: var(--font-size-h3);
      color: var(--text-primary);
    }

    .edit-btn {
      background: none;
      border: none;
      color: var(--accent-blue);
      cursor: pointer;
      font-size: var(--font-size-body);
      transition: all 0.3s ease;
    }

    .edit-btn:hover {
      color: var(--primary-green);
    }

    .profile-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .avatar-section {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-blue), var(--primary-green));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 40px;
      font-weight: var(--font-weight-bold);
      flex-shrink: 0;
    }

    .avatar-actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .avatar-btn {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      cursor: pointer;
      font-size: var(--font-size-body);
      transition: all 0.3s ease;
    }

    .avatar-btn:hover {
      border-color: var(--accent-blue);
      color: var(--accent-blue);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .form-group label {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    .form-group input,
    .form-group select {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--font-size-body);
      font-family: var(--font-family);
      transition: all 0.3s ease;
    }

    .form-group input:disabled,
    .form-group select:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .form-group input:focus,
    .form-group select:focus {
      outline: none;
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-actions {
      display: flex;
      gap: var(--spacing-lg);
      margin-top: var(--spacing-lg);
    }

    .form-actions app-button {
      flex: 1;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl);
    }

    app-card h2 {
      font-size: var(--font-size-h4);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .setting-list,
    .toggle-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .setting-row,
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-lg);
      background-color: var(--bg-primary);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .setting-info,
    .toggle-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .setting-title,
    .toggle-title {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    .setting-desc,
    .toggle-desc {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    .setting-btn {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--accent-blue);
      cursor: pointer;
      font-size: var(--font-size-body);
      transition: all 0.3s ease;
    }

    .setting-btn:hover {
      border-color: var(--accent-blue);
      background-color: rgba(59, 130, 246, 0.1);
    }

    .toggle-switch {
      position: relative;
      width: 50px;
      height: 28px;
      cursor: pointer;
    }

    .toggle-switch input {
      display: none;
    }

    .switch {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--border-color);
      transition: 0.3s;
      border-radius: 28px;
    }

    .switch::before {
      position: absolute;
      content: '';
      height: 22px;
      width: 22px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }

    input:checked + .switch {
      background-color: var(--primary-green);
    }

    input:checked + .switch::before {
      transform: translateX(22px);
    }

    .danger-zone {
      border-color: rgba(239, 68, 68, 0.3);
      background-color: rgba(239, 68, 68, 0.05);
    }

    .danger-zone h2 {
      color: var(--loss);
    }

    .danger-actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);
    }

    .danger-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-lg);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
    }

    .danger-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .danger-title {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--loss);
    }

    .danger-desc {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    @media (max-width: 768px) {
      .profile {
        padding: var(--spacing-lg);
      }

      .avatar-section {
        flex-direction: column;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .settings-grid {
        grid-template-columns: 1fr;
      }

      .danger-item {
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .danger-item app-button {
        width: 100%;
      }
    }
  `]
})
export class ProfileComponent {
  isEditMode = false;

  profile = {
    fullName: 'Quang Trần',
    email: 'quang@example.com',
    phone: '+84 901 234 567'
  };

  notifications = {
    emailAlerts: true,
    priceAlerts: true,
    transactionAlerts: false
  };

  twoFactorEnabled = false;

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile(): void {
    alert('Profile updated successfully');
    this.isEditMode = false;
  }
}
