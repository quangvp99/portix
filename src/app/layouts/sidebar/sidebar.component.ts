import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isOpen = true;
  private destroy$ = new Subject<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard' },
    { label: 'Portfolio', icon: '💼', route: '/portfolio' },
    { label: 'Transactions', icon: '💳', route: '/transactions' },
    { label: 'Market', icon: '📈', route: '/market' },
    { label: 'Watchlist', icon: '⭐', route: '/watchlist' },
    { label: 'Analytics', icon: '📉', route: '/analytics' },
    { label: 'Reports', icon: '📄', route: '/reports' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
