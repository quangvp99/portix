import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarService } from '@app/core/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-content" [class.collapsed]="isCollapsed">
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
      background-color: #050810;
    }

    :host-context(html:not(.dark)) .app-layout {
      background-color: #FFFFFF;
    }

    .main-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin-left: 260px;
      transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);

      &.collapsed {
        margin-left: 72px;
      }

      @media (max-width: 768px) {
        margin-left: 72px;
      }
    }

    .content-wrapper {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      background-color: #050810;
    }

    :host-context(html:not(.dark)) .content-wrapper {
      background-color: #F8FAFC;
    }
  `]
})
export class MainLayoutComponent implements OnInit {
  isCollapsed = false;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.isCollapsed$.subscribe(collapsed => {
      this.isCollapsed = collapsed;
    });
  }
}
