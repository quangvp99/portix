import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="topbar">
      <div class="topbar-left">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search stocks..."
            class="search-input"
            [(ngModel)]="searchQuery">
        </div>
      </div>

      <div class="topbar-center">
        <div class="market-status">
          <span class="status-dot"></span>
          <span class="status-text">Market is open</span>
          <span class="status-time">{{ currentTime }}</span>
        </div>
      </div>

      <div class="topbar-right">
        <div class="notification-btn">
          <span class="notification-icon">🔔</span>
          <span class="notification-badge">3</span>
        </div>
        <div class="user-menu">
          <div class="user-avatar">QT</div>
          <span class="user-name">Quang Trần</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .topbar {
      height: 72px;
      background-color: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      padding: 0 var(--spacing-xl);
      gap: var(--spacing-xl);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .topbar-left {
      flex: 0 0 350px;
    }

    .search-box {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-md) var(--spacing-lg);
      transition: all 0.3s ease;
    }

    .search-box:focus-within {
      border-color: var(--accent-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      font-size: 18px;
      color: var(--text-muted);
    }

    .search-input {
      flex: 1;
      background: none;
      border: none;
      color: var(--text-primary);
      font-size: var(--font-size-body);
      outline: none;
      font-family: var(--font-family);
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .topbar-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .market-status {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: rgba(34, 197, 94, 0.1);
      border-radius: var(--radius-md);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--profit);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .status-text {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--profit);
    }

    .status-time {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-xl);
    }

    .notification-btn {
      position: relative;
      cursor: pointer;
      font-size: 24px;
      transition: all 0.3s ease;
    }

    .notification-btn:hover {
      transform: scale(1.1);
    }

    .notification-badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: var(--loss);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-bold);
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      cursor: pointer;
      transition: all 0.3s ease;
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
    }

    .user-menu:hover {
      background-color: var(--hover-bg);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--accent-blue), var(--primary-green));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-body);
    }

    .user-name {
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      color: var(--text-primary);
    }

    @media (max-width: 1024px) {
      .topbar-left {
        flex: 0 0 250px;
      }

      .user-name {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .topbar {
        padding: 0 var(--spacing-lg);
        gap: var(--spacing-lg);
      }

      .topbar-left {
        flex: 0 0 200px;
      }

      .topbar-center {
        display: none;
      }
    }
  `]
})
export class TopbarComponent {
  searchQuery = '';
  currentTime = this.formatTime();

  constructor() {
    setInterval(() => {
      this.currentTime = this.formatTime();
    }, 1000);
  }

  private formatTime(): string {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  }
}
