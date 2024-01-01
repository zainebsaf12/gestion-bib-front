import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Livre} from "../models/livre.model";
import {AppConfig} from "../../../../app.config";

@Injectable({
  providedIn: 'root'
})
export class LivreService {
  private baseUrl = AppConfig.apiUrl;

  constructor(private http: HttpClient) {
  }

  saveLivre(livre: Livre): Observable<Livre> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<Livre>(`${this.baseUrl}/livres`, livre, httpOptions);
  }

  updateLivre(livreMaj: Livre): Observable<Livre> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<Livre>(`${this.baseUrl}/livres`, livreMaj, httpOptions);
  }

  deleteLivre(livreId: string | undefined): Observable<void> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(`${this.baseUrl}/livres/${livreId}`, httpOptions);
  }

  getLivresDispo(): Observable<Livre[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Livre[]>(`${this.baseUrl}/livres/disponibles`, httpOptions);
  }

  private getHttpOptions(): { headers: HttpHeaders, withCredentials: boolean } {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const withCredentials = true; // Mettez à true si les credentials sont nécessaires
    return {headers, withCredentials};
  }
}
