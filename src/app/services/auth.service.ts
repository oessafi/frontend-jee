import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Utiliser la route users/login (backend Spring Boot)
  // En dev vous pouvez remplacer par '/api' et configurer le proxy Angular
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    // POST http://localhost:8080/users/login
    return this.http.post(`${this.apiUrl}/users/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // On stocke le token dès la réception
          localStorage.setItem(this.tokenKey, response.token);
        }
      })
    );
  }

  /**
   * Récupère l'utilisateur courant depuis /users/me en envoyant le token
   */
  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    const headersObj: { [key: string]: string } = {};
    if (token) {
      headersObj['Authorization'] = `Bearer ${token}`;
    }
    return this.http.get(`${this.apiUrl}/users/me`, { headers: headersObj });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Idéalement, vérifiez aussi l'expiration du token ici
    return !!token;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = (jwt_decode as any)(token);
      const roles = decoded.roles;

      if (Array.isArray(roles) && roles.length > 0) {
        // Gère le cas où roles est ['ROLE_ADMIN'] ou [{authority: 'ROLE_ADMIN'}]
        return typeof roles[0] === 'string' ? roles[0] : roles[0].authority;
      }
       return typeof roles === 'string' ? roles : null;
    } catch (e) {
      return null;
    }
  }
}