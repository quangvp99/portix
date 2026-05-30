import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Stock, HistoricalPrice, Portfolio, Transaction, StockHolding } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private vietnamStocks: Stock[] = [
    {
      symbol: 'ACB',
      name: 'Asia Commercial Bank',
      sector: 'Banking',
      currentPrice: 31.5,
      previousClose: 31.2,
      open: 31.3,
      high: 32.1,
      low: 31.0,
      volume: 2145600,
      marketCap: 1.24e12,
      pe: 8.5,
      pb: 0.95,
      eps: 3.7,
      dividendYield: 3.2,
      change: 0.3,
      changePercent: 0.96
    },
    {
      symbol: 'MBB',
      name: 'Military Bank',
      sector: 'Banking',
      currentPrice: 27.8,
      previousClose: 27.6,
      open: 27.7,
      high: 28.3,
      low: 27.5,
      volume: 3256400,
      marketCap: 2.15e12,
      pe: 9.2,
      pb: 1.1,
      eps: 3.02,
      dividendYield: 2.8,
      change: 0.2,
      changePercent: 0.72
    },
    {
      symbol: 'HPG',
      name: 'Hoa Phat Group',
      sector: 'Steel',
      currentPrice: 38.9,
      previousClose: 38.5,
      open: 38.6,
      high: 39.8,
      low: 38.3,
      volume: 4523100,
      marketCap: 3.86e12,
      pe: 7.8,
      pb: 1.05,
      eps: 4.99,
      dividendYield: 4.2,
      change: 0.4,
      changePercent: 1.04
    },
    {
      symbol: 'SSI',
      name: 'SSI Securities',
      sector: 'Securities',
      currentPrice: 24.2,
      previousClose: 24.0,
      open: 24.1,
      high: 24.9,
      low: 24.0,
      volume: 2341200,
      marketCap: 1.58e12,
      pe: 11.5,
      pb: 1.2,
      eps: 2.1,
      dividendYield: 2.1,
      change: 0.2,
      changePercent: 0.83
    },
    {
      symbol: 'DBC',
      name: 'Duc Long Gia Lai',
      sector: 'Agriculture',
      currentPrice: 15.6,
      previousClose: 15.3,
      open: 15.4,
      high: 16.1,
      low: 15.2,
      volume: 1652300,
      marketCap: 456e9,
      pe: 13.2,
      pb: 0.98,
      eps: 1.18,
      dividendYield: 1.9,
      change: 0.3,
      changePercent: 1.96
    },
    {
      symbol: 'FPT',
      name: 'FPT Corporation',
      sector: 'Technology',
      currentPrice: 55.3,
      previousClose: 54.8,
      open: 55.0,
      high: 56.2,
      low: 54.7,
      volume: 1823400,
      marketCap: 2.74e12,
      pe: 18.5,
      pb: 3.2,
      eps: 2.99,
      dividendYield: 1.5,
      change: 0.5,
      changePercent: 0.91
    }
  ];

  private mockPortfolios: Portfolio[] = [
    {
      id: '1',
      name: 'Main Portfolio',
      investedCapital: 250000000,
      currentValue: 287500000,
      profitLoss: 37500000,
      profitLossPercent: 15,
      holdings: [
        { symbol: 'ACB', quantity: 5000, avgCost: 30.5, currentPrice: 31.5, weight: 15 },
        { symbol: 'MBB', quantity: 6000, avgCost: 26.8, currentPrice: 27.8, weight: 20 },
        { symbol: 'HPG', quantity: 4000, avgCost: 37.2, currentPrice: 38.9, weight: 18 },
        { symbol: 'FPT', quantity: 2000, avgCost: 52.1, currentPrice: 55.3, weight: 12 },
        { symbol: 'DBC', quantity: 8000, avgCost: 14.9, currentPrice: 15.6, weight: 13 }
      ],
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      name: 'Growth Portfolio',
      investedCapital: 150000000,
      currentValue: 172500000,
      profitLoss: 22500000,
      profitLossPercent: 15,
      holdings: [
        { symbol: 'FPT', quantity: 3000, avgCost: 51.5, currentPrice: 55.3, weight: 30 },
        { symbol: 'SSI', quantity: 5000, avgCost: 23.5, currentPrice: 24.2, weight: 25 },
        { symbol: 'ACB', quantity: 3000, avgCost: 31.0, currentPrice: 31.5, weight: 20 }
      ],
      createdAt: new Date('2023-06-20')
    }
  ];

  private mockTransactions: Transaction[] = [
    { id: '1', symbol: 'ACB', type: 'BUY', quantity: 5000, price: 30.5, date: new Date('2023-01-20') },
    { id: '2', symbol: 'MBB', type: 'BUY', quantity: 6000, price: 26.8, date: new Date('2023-02-10') },
    { id: '3', symbol: 'HPG', type: 'BUY', quantity: 4000, price: 37.2, date: new Date('2023-03-15') },
    { id: '4', symbol: 'FPT', type: 'BUY', quantity: 2000, price: 52.1, date: new Date('2023-04-05') },
    { id: '5', symbol: 'DBC', type: 'BUY', quantity: 8000, price: 14.9, date: new Date('2023-05-12') }
  ];

  constructor() { }

  getStocks(): Observable<Stock[]> {
    return of(this.vietnamStocks);
  }

  getStock(symbol: string): Observable<Stock | undefined> {
    return of(this.vietnamStocks.find(s => s.symbol === symbol));
  }

  getHistoricalPrices(symbol: string): Observable<HistoricalPrice[]> {
    const stock = this.vietnamStocks.find(s => s.symbol === symbol);
    if (!stock) return of([]);

    const prices: HistoricalPrice[] = [];
    const basePrice = stock.currentPrice;
    
    for (let i = 30; i >= 0; i--) {
      const variance = (Math.random() - 0.5) * 2 * basePrice * 0.02;
      const close = Math.max(basePrice * 0.95, basePrice * 1.05, basePrice + variance);
      
      prices.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        open: close * (0.98 + Math.random() * 0.04),
        high: close * (1.01 + Math.random() * 0.02),
        low: close * (0.99 - Math.random() * 0.02),
        close: close,
        volume: Math.floor(Math.random() * 5000000) + 500000
      });
    }
    
    return of(prices);
  }

  getPortfolios(): Observable<Portfolio[]> {
    return of(this.mockPortfolios);
  }

  getPortfolio(id: string): Observable<Portfolio | undefined> {
    return of(this.mockPortfolios.find(p => p.id === id));
  }

  getTransactions(): Observable<Transaction[]> {
    return of(this.mockTransactions);
  }

  addTransaction(transaction: Transaction): Observable<void> {
    this.mockTransactions.push(transaction);
    return of(void 0);
  }
}
