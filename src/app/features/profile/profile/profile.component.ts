import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container" *ngIf="currentUser">
      <h1>User Profile</h1>
      <div class="profile-card">
        <div class="avatar-section">
          <div class="avatar">👤</div>
          <h2>{{ currentUser.fullName }}</h2>
        </div>
        <div class="info-section">
          <div class="info-item">
            <label>Email</label>
            <p>{{ currentUser.email }}</p>
          </div>
          <div class="info-item" *ngIf="currentUser.phoneNumber">
            <label>Phone</label>
            <p>{{ currentUser.phoneNumber }}</p>
          </div>
          <div class="info-item">
            <label>Member Since</label>
            <p>{{ currentUser.createdAt | date:'mediumDate' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container { padding: 2rem; max-width: 600px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 700; margin: 0 0 2rem; }
    .profile-card { background-color: var(--color-card); border: 1px solid var(--color-border); border-radius: var(--radius-base); padding: 2rem; }
    .avatar-section { text-align: center; margin-bottom: 2rem; }
    .avatar { font-size: 64px; margin-bottom: 1rem; }
    h2 { margin: 0; }
    .info-section { display: grid; gap: 1.5rem; }
    .info-item label { font-size: 12px; text-transform: uppercase; color: #94A3B8; font-weight: 600; margin-bottom: 0.5rem; display: block; }
    .info-item p { margin: 0; font-size: 16px; }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }
}
