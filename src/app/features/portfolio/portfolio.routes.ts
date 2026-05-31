import { Routes } from '@angular/router';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';
import { PortfolioDetailComponent } from './portfolio-detail/portfolio-detail.component';

export const PORTFOLIO_ROUTES: Routes = [
  { path: '', component: PortfolioListComponent },
  { path: ':id', component: PortfolioDetailComponent }
];
