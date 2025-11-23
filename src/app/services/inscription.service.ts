import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../models/app.models';

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  constructor(private http: HttpClient) {}

  create(data: Partial<Inscription>) {
    return this.http.post<Inscription>(`${API_URL}/inscriptions`, data);
  }

  getMyInscriptions(doctorantId: string) {
    return this.http.get<Inscription[]>(`${API_URL}/inscriptions/doctorant/${doctorantId}`);
  }

  uploadDocument(inscriptionId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${API_URL}/inscriptions/${inscriptionId}/documents`, formData);
  }

  getAll() {
    return this.http.get<Inscription[]>(`${API_URL}/inscriptions`);
  }

  validate(id: string, request: any) {
    return this.http.put(`${API_URL}/inscriptions/${id}/validate/admin`, request);
  }

  validateByDirecteur(id: string, request: any) {
    return this.http.put(`${API_URL}/inscriptions/${id}/validate/directeur`, request);
  }
}
