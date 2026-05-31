import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, PaginatedResponse } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  getTransactions(portfolioId?: string, page: number = 1, pageSize: number = 20): Observable<PaginatedResponse<Transaction>> {
    let url = this.apiUrl;
    if (portfolioId) {
      url = `${environment.apiUrl}/portfolios/${portfolioId}/transactions`;
    }
    return this.http.get<PaginatedResponse<Transaction>>(url, {
      params: { page, pageSize }
    });
  }

  getTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  updateTransaction(id: string, transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getRecentTransactions(limit: number = 10): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/recent`, {
      params: { limit }
    });
  }
}
