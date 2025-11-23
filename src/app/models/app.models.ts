export enum UserRole {
  CANDIDAT = 'CANDIDAT',
  DOCTORANT = 'DOCTORANT',
  DIRECTEUR_THESE = 'DIRECTEUR_THESE',
  PERSONNEL_ADMIN = 'PERSONNEL_ADMIN'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  studentId?: string;
}

export enum InscriptionType {
  INSCRIPTION_INITIALE = 'INSCRIPTION_INITIALE',
  REINSCRIPTION = 'REINSCRIPTION'
}

export enum InscriptionStatus {
  BROUILLON = 'BROUILLON',
  SOUMISE = 'SOUMISE',
  EN_ATTENTE_DIRECTEUR = 'EN_ATTENTE_DIRECTEUR',
  EN_ATTENTE_ADMIN = 'EN_ATTENTE_ADMIN',
  VALIDE = 'VALIDE'
  // Ajoutez d'autres statuts si nécessaire
}

export interface Inscription {
  id: string;
  doctorantId: string;
  doctorantName: string;
  directeurId: string;
  directeurName: string;
  type: InscriptionType;
  status: InscriptionStatus;
  sujetThese: string;
  laboratoire: string;
  anneeAcademique: string;
}

export enum SoutenanceStatus {
  INITIEE = 'INITIEE',
  VALIDEE_ADMIN = 'VALIDEE_ADMIN',
  PLANIFIEE = 'PLANIFIEE'
  // Ajoutez d'autres statuts si nécessaire
}

export interface DemandeSoutenance {
  id: string;
  doctorantId: string;
  status: SoutenanceStatus;
  dateSoutenance: string;
  lieuSoutenance: string;
}

export interface Campagne {
  id: string;
  anneeAcademique: string;
  type: string;
  dateDebut: string;
  dateFin: string;
  active: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
