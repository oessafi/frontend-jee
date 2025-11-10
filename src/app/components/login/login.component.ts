import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = null; // Réinitialiser l'erreur
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Connexion réussie', response.token);
        // Rediriger vers la page principale après le login
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }
}