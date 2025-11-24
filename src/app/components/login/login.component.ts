import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Formulaire invalide';
      return;
    }

    this.errorMessage = ''; // Réinitialiser l'erreur
    const credentials = this.loginForm.value;

    this.auth.login(credentials).subscribe({
      next: (res) => {
        // res contient { token: '...', user: {...} }
        const backendUserRole = res?.user?.role;

        if (backendUserRole) {
          const normalized = this.normalizeRole(backendUserRole);
          this.redirectByRole(normalized);
        } else {
          // Si la réponse est invalide (pas de user ou pas de rôle)
          this.errorMessage = 'Réponse invalide du serveur.';
          this.auth.logout(); // Nettoyer au cas où
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        // Affiche le message d'erreur renvoyé par le backend si présent
        const backendMessage = err?.error?.message || err?.error || null;
        if (backendMessage) {
          this.errorMessage = String(backendMessage);
        } else if (err?.status) {
          this.errorMessage = `Erreur ${err.status} - ${err.statusText || 'Connexion refusée'}`;
        } else {
          this.errorMessage = 'Échec de la connexion';
        }
      }
    });
  }
  // Rôles normalisés
  private readonly ROLE_ENCADRANT = 'ROLE_ENCADRANT';
  private readonly ROLE_ADMIN = 'ROLE_ADMIN'; // ou 'ROLE_ADMINISTRATIF' selon la config
  private readonly ROLE_DOCTORANT = 'ROLE_DOCTORANT';

  private normalizeRole(role: string): string {
    switch (role) {
      case 'ENCADRANT':
      case 'ROLE_ENCADRANT':
        return 'ROLE_ENCADRANT';
      case 'ADMINISTRATIF':
      case 'ADMIN':
      case 'ROLE_ADMINISTRATIF':
      case 'ROLE_ADMIN':
        return 'ROLE_ADMINISTRATIF';
      default:
        // si le backend renvoie déjà une valeur ROLE_..., on la retourne
        if (role.startsWith('ROLE_')) return role;
        return role;
    }
  }

  private redirectByRole(role: string): void {
    if (role === this.ROLE_ENCADRANT) {
      this.router.navigate(['/encadrant/dashboard']);
    } else if (role === this.ROLE_ADMIN) {
      this.router.navigate(['/admin/dashboard']);
    } else if (role === this.ROLE_DOCTORANT) {
      this.router.navigate(['/doctorant/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // ...existing code...
}