import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardMetrics, TopStock, Stock } from '@app/models';
import { PortfolioService } from '@app/core/services/portfolio.service';
import { MarketService } from '@app/core/services/market.service';
import { TransactionService } from '@app/core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  metrics: DashboardMetrics | null = null;
  topGainers: TopStock[] = [];
  topLosers: TopStock[] = [];
  recentTransactions: any[] = [];
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private portfolioService: PortfolioService,
    private marketService: MarketService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;
    this.error = '';

    // Load portfolio metrics
    this.portfolioService.getPortfolios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (portfolios) => {
          this.calculateMetrics(portfolios);
          this.loadMarketData();
          this.loadRecentTransactions();
        },
        error: (err) => {
          this.error = 'Failed to load dashboard data';
          this.loading = false;
          console.error(err);
        }
      });
  }

  private calculateMetrics(portfolios: any[]): void {
    let totalValue = 0;
    let totalCost = 0;
    let totalProfit = 0;
    const topGainersMap = new Map<string, TopStock>();
    const topLosersMap = new Map<string, TopStock>();

    portfolios.forEach(portfolio => {
      totalValue += portfolio.currentValue || 0;
      totalCost += portfolio.totalCost || 0;
      totalProfit += portfolio.unrealizedProfit || 0;

      portfolio.holdings?.forEach((holding: any) => {
        const returnPct = ((holding.currentPrice - holding.averagePrice) / holding.averagePrice) * 100;
        const topStock: TopStock = {
          symbol: holding.symbol,
          companyName: holding.companyName,
          quantity: holding.quantity,
          averagePrice: holding.averagePrice,
          currentPrice: holding.currentPrice,
          profit: holding.profit,
          returnPercentage: returnPct
        };

        if (returnPct > 0) {
          if (!topGainersMap.has(holding.symbol) || (topGainersMap.get(holding.symbol)!.returnPercentage < returnPct)) {
            topGainersMap.set(holding.symbol, topStock);
          }
        } else {
          if (!topLosersMap.has(holding.symbol) || (topLosersMap.get(holding.symbol)!.returnPercentage > returnPct)) {
            topLosersMap.set(holding.symbol, topStock);
          }
        }
      });
    });

    this.metrics = {
      totalPortfolioValue: totalValue,
      totalProfit: totalProfit,
      dailyProfit: 0,
      totalInvestedCapital: totalCost,
      cashBalance: 0,
      roi: totalCost > 0 ? (totalProfit / totalCost) * 100 : 0,
      dayChangePercent: 0
    };

    this.topGainers = Array.from(topGainersMap.values()).sort((a, b) => b.returnPercentage - a.returnPercentage).slice(0, 5);
    this.topLosers = Array.from(topLosersMap.values()).sort((a, b) => a.returnPercentage - b.returnPercentage).slice(0, 5);
  }

  private loadMarketData(): void {
    this.marketService.getTopGainers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err) => console.error('Failed to load top gainers:', err)
      });
  }

  private loadRecentTransactions(): void {
    this.transactionService.getRecentTransactions(10)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (transactions) => {
          this.recentTransactions = transactions;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load transactions:', err);
          this.loading = false;
        }
      });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  }

  formatPercent(value: number): string {
    return (value >= 0 ? '+' : '') + value.toFixed(2) + '%';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
