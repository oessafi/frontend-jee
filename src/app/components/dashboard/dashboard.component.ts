import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // Page de connexion
  { path: 'login', component: LoginComponent },

  // Page après connexion
  { path: 'dashboard', component: DashboardComponent }, // TODO: Protéger cette route

  // Rediriger par défaut vers la page de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rediriger toute autre route inconnue
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }