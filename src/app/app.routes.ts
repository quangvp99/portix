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
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
