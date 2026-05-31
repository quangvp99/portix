import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-header></app-header>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      height: 100vh;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-left: 260px;
      transition: margin-left 0.3s ease;

      @media (max-width: 768px) {
        margin-left: 80px;
      }
    }

    .content-wrapper {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  `]
})
export class MainLayoutComponent {}
