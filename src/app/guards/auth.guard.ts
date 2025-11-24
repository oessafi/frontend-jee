import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  // Injection des dépendances
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Vérifier si l'utilisateur est authentifié
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Vérifier les rôles
  const expectedRoles = route.data?.['roles'] as string[] | string | undefined;
  
  // CORRECTION : On utilise 'authService' directement (pas de 'this' dans une fonction fléchée)
  const currentUser = authService.getCurrentUser();
  
  const userRole: string = currentUser && currentUser.role ? currentUser.role : '';

  if (expectedRoles) {
    const rolesArray = Array.isArray(expectedRoles) ? expectedRoles : [expectedRoles];
    
    // Vérifie si le rôle de l'utilisateur est dans la liste des rôles attendus
    if (!rolesArray.includes(userRole)) {
      // Redirection si l'utilisateur n'a pas le bon droit
      router.navigate(['/login']); 
      return false;
    }
  }

  return true;
};