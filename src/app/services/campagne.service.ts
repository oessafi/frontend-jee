import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campagne } from '../models/app.models';

const API_URL = 'http://localhost:8080/api/v1';

@Injectable({ providedIn: 'root' })
export class CampagneService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Campagne[]> {
    return this.http.get<Campagne[]>(`${API_URL}/campagnes`);
  }

  open(id: string): Observable<any> {
    return this.http.put(`${API_URL}/campagnes/${id}/open`, {});
  }

  close(id: string): Observable<any> {
    return this.http.put(`${API_URL}/campagnes/${id}/close`, {});
  }

  create(data: Partial<Campagne>): Observable<Campagne> {
    return this.http.post<Campagne>(`${API_URL}/campagnes`, data);
  }
}
