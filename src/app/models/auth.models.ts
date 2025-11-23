// Correspond à AuthRequest.java
export interface AuthRequest {
  email: string;
  password: string;
}

// Correspond à AuthResponse.java (modifiée)
export interface AuthResponse {
  token: string;
  user: UserDTO; // <-- AJOUTÉ
}

// Représente le UserDTO.java du backend
export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string; // Ex: "DOCTORANT", "PERSONNEL_ADMIN"
  status: string;
  specialty: string;
  laboratory: string;
  studentId: string;
  createdAt: string; // ou Date
  updatedAt: string; // ou Date
}