// Correspond à AuthRequest.java
export interface AuthRequest {
  email: string;
  password: string;
}

// Correspond à AuthResponse.java
export interface AuthResponse {
  token: string;
}

// Représente l'utilisateur retourné par /users/me
export interface UserDTO {
  id?: number;
  email?: string;
  // le backend expose le rôle principal sous 'role'
  role: string;
}