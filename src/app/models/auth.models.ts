// Correspond à AuthRequest.java
export interface AuthRequest {
  email: string;
  password: string;
}

// Correspond à AuthResponse.java
export interface AuthResponse {
  token: string;
}