import { Routes } from '@angular/router';
import { LoginComponent } from '@app/features/auth/login/login.component';
import { RegisterComponent } from '@app/features/auth/register/register.component';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';
import { MainLayoutComponent } from '@app/layouts/main-layout/main-layout.component';
import { AuthGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'portfolio', loadChildren: () => import('@app/features/portfolio/portfolio.routes').then(m => m.PORTFOLIO_ROUTES) },
      { path: 'transactions', loadChildren: () => import('@app/features/transactions/transactions.routes').then(m => m.TRANSACTION_ROUTES) },
      { path: 'market', loadChildren: () => import('@app/features/market/market.routes').then(m => m.MARKET_ROUTES) },
      { path: 'watchlist', loadChildren: () => import('@app/features/watchlist/watchlist.routes').then(m => m.WATCHLIST_ROUTES) },
      { path: 'analytics', loadChildren: () => import('@app/features/analytics/analytics.routes').then(m => m.ANALYTICS_ROUTES) },
      { path: 'reports', loadChildren: () => import('@app/features/reports/reports.routes').then(m => m.REPORTS_ROUTES) },
      { path: 'profile', loadChildren: () => import('@app/features/profile/profile.routes').then(m => m.PROFILE_ROUTES) },
      { path: 'settings', loadChildren: () => import('@app/features/settings/settings.routes').then(m => m.SETTINGS_ROUTES) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
