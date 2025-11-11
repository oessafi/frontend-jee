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

    const credentials = this.loginForm.value;
    this.auth.login(credentials).subscribe({
      next: (res) => {
        // res should contain { token: '...' }
        const token = (res as any)?.token;
        if (!token) {
          this.errorMessage = 'Réponse invalide du serveur (pas de token)';
          return;
        }
        // Si le backend renvoie déjà l'utilisateur dans la réponse de login, utilise son rôle
        const backendUserRole = (res as any)?.user?.role;
        if (backendUserRole) {
          const normalized = this.normalizeRole(backendUserRole);
          this.redirectByRole(normalized);
          return;
        }

        // Sinon, récupérer l'utilisateur courant depuis le backend (/users/me) et rediriger selon le rôle
        this.auth.getCurrentUser().subscribe({
          next: (user: any) => {
            const role = user?.role;
            if (role) {
              const normalized = this.normalizeRole(role);
              this.redirectByRole(normalized);
            } else {
              this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            console.error('Impossible de récupérer l\'utilisateur courant', err);
            this.errorMessage = 'Échec de la connexion';
          }
        });
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Échec de la connexion';
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