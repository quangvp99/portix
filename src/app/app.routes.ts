import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'portfolio/:id',
        component: PortfolioDetailComponent
      },
      {
        path: 'stock/:symbol',
        component: StockDetailComponent
      },
      {
        path: 'watchlist',
        component: WatchlistComponent
      },
      {
        path: 'analytics',
        component: AnalyticsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];
