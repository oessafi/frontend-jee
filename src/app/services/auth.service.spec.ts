import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // L'URL de notre API Gateway (gérée par le proxy)
  private apiUrl = '/api/v1/users'; 

  constructor(private http: HttpClient) { }

  /**
   * Appelle l'endpoint de login du user-service
   *
   */
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Étape suivante : stocker le token
        this.saveToken(response.token);
      })
    );
  }

  private saveToken(token: string) {
    // Nous stockons le token dans le localStorage du navigateur
    localStorage.setItem('authToken', token);
    console.log('Token sauvegardé !');
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}