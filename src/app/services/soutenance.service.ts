import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DemandeSoutenance } from '../models/app.models';

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class SoutenanceService {
  constructor(private http: HttpClient) {}

  initier(data: Partial<DemandeSoutenance>) {
    return this.http.post<DemandeSoutenance>(`${API_URL}/soutenances`, data);
  }

  getDemande(id: string) {
    return this.http.get<DemandeSoutenance>(`${API_URL}/soutenances/${id}`);
  }

  proposerJury(demandeId: string, request: any) {
    return this.http.post(`${API_URL}/soutenances/${demandeId}/jury`, request);
  }
}
