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
  private redirectByRole(role: string): void {
    switch (role) {
      case 'ROLE_DOCTORANT':
        this.router.navigate(['/doctorant/dashboard']);
        break;
      case 'ROLE_ENCADRANT':
        this.router.navigate(['/encadrant/dashboard']);
        break;
      case 'ROLE_ADMINISTRATIF':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  /**
   * Normalise les valeurs de rôle renvoyées par le backend vers nos constantes
   * Exemples : 'CANDIDAT' -> 'ROLE_DOCTORANT'
   */
  private normalizeRole(raw: string): string {
    if (!raw) return raw;
    const r = raw.toUpperCase();
    switch (r) {
      case 'CANDIDAT':
      case 'ROLE_CANDIDAT':
      case 'DOCTORANT':
        return 'ROLE_DOCTORANT';
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
        if (r.startsWith('ROLE_')) return r;
        return r;
    }
  }
}