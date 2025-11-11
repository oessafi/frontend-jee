import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorantDashboardComponent } from './components/doctorant/doctorant-dashboard.component';
import { EncadrantDashboardComponent } from './components/encadrant/encadrant-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctorant/dashboard', component: DoctorantDashboardComponent },
  { path: 'encadrant/dashboard', component: EncadrantDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];