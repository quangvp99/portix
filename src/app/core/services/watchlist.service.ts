import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Watchlist, Stock } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = `${environment.apiUrl}/watchlists`;

  constructor(private http: HttpClient) {}

  getWatchlists(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(this.apiUrl);
  }

  getWatchlistById(id: string): Observable<Watchlist> {
    return this.http.get<Watchlist>(`${this.apiUrl}/${id}`);
  }

  createWatchlist(name: string): Observable<Watchlist> {
    return this.http.post<Watchlist>(this.apiUrl, { name, symbols: [] });
  }

  updateWatchlist(id: string, name: string): Observable<Watchlist> {
    return this.http.put<Watchlist>(`${this.apiUrl}/${id}`, { name });
  }

  deleteWatchlist(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  addSymbol(watchlistId: string, symbol: string): Observable<Watchlist> {
    return this.http.post<Watchlist>(`${this.apiUrl}/${watchlistId}/symbols`, { symbol });
  }

  removeSymbol(watchlistId: string, symbol: string): Observable<Watchlist> {
    return this.http.delete<Watchlist>(`${this.apiUrl}/${watchlistId}/symbols/${symbol}`);
  }

  getWatchlistStocks(watchlistId: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/${watchlistId}/stocks`);
  }
}
