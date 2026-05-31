import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock, StockDetail, OHLCData, Benchmark, BenchmarkComparison } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private apiUrl = `${environment.apiUrl}/market`;

  constructor(private http: HttpClient) {}

  searchStocks(query: string): Observable<Stock[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<Stock[]>(`${this.apiUrl}/search`, { params });
  }

  getStocksByMarketIndex(index: 'VN30' | 'VN100' | 'HNX30' | 'UPCOM'): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/indices/${index}`);
  }

  getStockDetail(symbol: string): Observable<StockDetail> {
    return this.http.get<StockDetail>(`${this.apiUrl}/stocks/${symbol}`);
  }

  getOHLCData(symbol: string, period: 'day' | 'week' | 'month' | 'year'): Observable<OHLCData[]> {
    const params = new HttpParams().set('period', period);
    return this.http.get<OHLCData[]>(`${this.apiUrl}/stocks/${symbol}/ohlc`, { params });
  }

  getStockNews(symbol: string, limit: number = 10): Observable<any[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<any[]>(`${this.apiUrl}/stocks/${symbol}/news`, { params });
  }

  getBenchmarkComparison(portfolioReturn: number): Observable<BenchmarkComparison> {
    return this.http.post<BenchmarkComparison>(`${this.apiUrl}/benchmarks/compare`, { portfolioReturn });
  }

  getTrendingStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/trending`);
  }

  getTopGainers(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/top-gainers`);
  }

  getTopLosers(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/top-losers`);
  }
}
