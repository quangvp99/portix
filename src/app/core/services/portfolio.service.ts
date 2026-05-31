import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio, Holding, PaginatedResponse } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = `${environment.apiUrl}/portfolios`;

  constructor(private http: HttpClient) {}

  getPortfolios(): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.apiUrl);
  }

  getPortfolioById(id: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/${id}`);
  }

  createPortfolio(name: string, description?: string): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.apiUrl, { name, description });
  }

  updatePortfolio(id: string, name: string, description?: string): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.apiUrl}/${id}`, { name, description });
  }

  deletePortfolio(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getHoldings(portfolioId: string): Observable<Holding[]> {
    return this.http.get<Holding[]>(`${this.apiUrl}/${portfolioId}/holdings`);
  }

  addHolding(portfolioId: string, holding: Partial<Holding>): Observable<Holding> {
    return this.http.post<Holding>(`${this.apiUrl}/${portfolioId}/holdings`, holding);
  }

  updateHolding(portfolioId: string, holdingId: string, holding: Partial<Holding>): Observable<Holding> {
    return this.http.put<Holding>(`${this.apiUrl}/${portfolioId}/holdings/${holdingId}`, holding);
  }

  deleteHolding(portfolioId: string, holdingId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${portfolioId}/holdings/${holdingId}`);
  }
}
