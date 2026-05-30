import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-icon">📊</span>
          <span class="logo-text">PortMgr</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <a 
            routerLink="/dashboard"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            class="nav-item">
            <span class="nav-icon">🏠</span>
            <span class="nav-label">Dashboard</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Portfolio</div>
          <a 
            href="#portfolios"
            class="nav-item">
            <span class="nav-icon">💼</span>
            <span class="nav-label">My Portfolios</span>
          </a>
          <a 
            href="#transactions"
            class="nav-item">
            <span class="nav-icon">📝</span>
            <span class="nav-label">Transactions</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Market</div>
          <a 
            routerLink="/watchlist"
            routerLinkActive="active"
            class="nav-item">
            <span class="nav-icon">⭐</span>
            <span class="nav-label">Watchlist</span>
          </a>
          <a 
            href="#stocks"
            class="nav-item">
            <span class="nav-icon">📈</span>
            <span class="nav-label">Stocks</span>
          </a>
        </div>

        <div class="nav-section">
          <a 
            routerLink="/analytics"
            routerLinkActive="active"
            class="nav-item">
            <span class="nav-icon">📊</span>
            <span class="nav-label">Analytics</span>
          </a>
        </div>

        <div class="nav-section">
          <a 
            routerLink="/profile"
            routerLinkActive="active"
            class="nav-item">
            <span class="nav-icon">👤</span>
            <span class="nav-label">Profile</span>
          </a>
          <a 
            href="#settings"
            class="nav-item">
            <span class="nav-icon">⚙️</span>
            <span class="nav-label">Settings</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <a href="#logout" class="logout-btn">
          <span class="nav-icon">🚪</span>
          <span class="nav-label">Logout</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background-color: var(--bg-secondary);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      position: sticky;
      top: 0;
    }

    .sidebar-header {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      cursor: pointer;
    }

    .logo-icon {
      font-size: 24px;
    }

    .logo-text {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
    }

    .sidebar-nav {
      flex: 1;
      padding: var(--spacing-lg) 0;
      overflow-y: auto;
    }

    .nav-section {
      padding: var(--spacing-md) var(--spacing-lg);
    }

    .nav-section-title {
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-semibold);
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: var(--spacing-md);
      padding: 0 var(--spacing-md);
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      margin-bottom: var(--spacing-xs);
    }

    .nav-item:hover {
      background-color: var(--hover-bg);
      color: var(--text-primary);
    }

    .nav-item.active {
      background-color: var(--primary-green);
      color: var(--bg-primary);
      font-weight: var(--font-weight-semibold);
    }

    .nav-icon {
      font-size: 18px;
      min-width: 20px;
    }

    .nav-label {
      font-size: var(--font-size-body);
    }

    .sidebar-footer {
      padding: var(--spacing-lg);
      border-top: 1px solid var(--border-color);
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      text-decoration: none;
      transition: all 0.3s ease;
      width: 100%;
    }

    .logout-btn:hover {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--loss);
    }

    @media (max-width: 1024px) {
      .sidebar {
        width: 240px;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .sidebar.active {
        transform: translateX(0);
      }
    }
  `]
})
export class SidebarComponent {
}
