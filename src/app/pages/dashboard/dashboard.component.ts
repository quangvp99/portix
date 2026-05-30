import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { StockService } from '../../services/stock.service';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Portfolio, StockHolding } from '../../models/stock.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxEchartsModule,
    KpiCardComponent,
    CardComponent,
    BadgeComponent,
    ButtonComponent
  ],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Good Morning, Investor</h1>
        <p class="subtitle">{{ getGreeting() }}</p>
      </div>

      <!-- KPI Cards Section -->
      <div class="kpi-section">
        <app-kpi-card
          label="Total Portfolio Value"
          [value]="totalValue"
          [changePercent]="15"
          [changeText]="'vs last month'">
        </app-kpi-card>
        <app-kpi-card
          label="Today's Profit/Loss"
          [value]="dailyProfit"
          [changePercent]="2.5"
          [changeText]="'vs yesterday'">
        </app-kpi-card>
        <app-kpi-card
          label="Total Return"
          [value]="totalReturn"
          [changePercent]="15"
          [changeText]="'since inception'">
        </app-kpi-card>
        <app-kpi-card
          label="Cash Balance"
          [value]="cashBalance"
          [changePercent]="-5"
          [changeText]="'from deposit'">
        </app-kpi-card>
      </div>

      <div class="dashboard-content">
        <!-- Main Chart Section -->
        <div class="chart-section">
          <app-card>
            <div class="chart-header">
              <h2>Portfolio Growth</h2>
              <div class="time-filters">
                <button *ngFor="let period of timePeriods"
                  [class.active]="period === selectedPeriod"
                  (click)="selectedPeriod = period"
                  class="time-filter-btn">
                  {{ period }}
                </button>
              </div>
            </div>
            <div echarts [options]="portfolioChartOptions" style="height: 350px;"></div>
          </app-card>
        </div>

        <div class="dashboard-grid">
          <!-- Asset Allocation -->
          <app-card class="allocation-card">
            <h3>Asset Allocation</h3>
            <div echarts [options]="allocationChartOptions" style="height: 300px;"></div>
            <div class="allocation-legend">
              <div class="legend-item" *ngFor="let sector of sectors">
                <span class="legend-color" [style.background-color]="sector.color"></span>
                <span class="legend-label">{{ sector.name }}: {{ sector.percentage }}%</span>
              </div>
            </div>
          </app-card>

          <!-- Recent Transactions -->
          <app-card class="transactions-card">
            <h3>Recent Transactions</h3>
            <div class="transactions-list">
              <div class="transaction-item" *ngFor="let txn of recentTransactions">
                <div class="transaction-info">
                  <span class="transaction-symbol">{{ txn.symbol }}</span>
                  <span class="transaction-type" [class.buy]="txn.type === 'BUY'">
                    {{ txn.type === 'BUY' ? '📈 Bought' : '📉 Sold' }}
                  </span>
                  <span class="transaction-date">{{ txn.date | date: 'MMM d' }}</span>
                </div>
                <span class="transaction-value" [class.positive]="txn.type === 'BUY'">
                  {{ (txn.type === 'BUY' ? '+' : '-') }}{{ txn.quantity | number }}
                </span>
              </div>
            </div>
          </app-card>
        </div>
      </div>

      <!-- Top Holdings Table -->
      <app-card class="holdings-section">
        <div class="holdings-header">
          <h2>Top Holdings</h2>
          <app-button variant="secondary" size="sm">View All</app-button>
        </div>
        <div class="table-wrapper">
          <table class="holdings-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Avg Cost</th>
                <th>Current Price</th>
                <th>Market Value</th>
                <th>Profit/Loss</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let holding of topHoldings">
                <td>
                  <a [routerLink]="['/stock', holding.symbol]" class="symbol-link">
                    {{ holding.symbol }}
                  </a>
                </td>
                <td>{{ holding.quantity | number }}</td>
                <td class="price-cell">{{ holding.avgCost | number: '1.2-2' }}</td>
                <td class="price-cell">{{ holding.currentPrice | number: '1.2-2' }}</td>
                <td class="price-cell">
                  {{ (holding.quantity * holding.currentPrice) | number: '1.0-0' }}
                </td>
                <td>
                  <app-badge
                    [variant]="(holding.currentPrice - holding.avgCost) > 0 ? 'profit' : 'loss'">
                    {{ ((holding.currentPrice - holding.avgCost) * holding.quantity) | number: '1.0-0' }}
                  </app-badge>
                </td>
                <td>{{ holding.weight }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .dashboard-header {
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .dashboard-header h1 {
      font-size: var(--font-size-h1);
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }

    .subtitle {
      color: var(--text-secondary);
      font-size: var(--font-size-body);
    }

    .kpi-section {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-lg);
    }

    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .chart-section {
      width: 100%;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .chart-header h2 {
      font-size: var(--font-size-h3);
      color: var(--text-primary);
    }

    .time-filters {
      display: flex;
      gap: var(--spacing-sm);
    }

    .time-filter-btn {
      padding: var(--spacing-sm) var(--spacing-md);
      background-color: transparent;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      font-size: var(--font-size-caption);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .time-filter-btn:hover {
      border-color: var(--accent-blue);
      color: var(--accent-blue);
    }

    .time-filter-btn.active {
      background-color: var(--primary-green);
      border-color: var(--primary-green);
      color: var(--bg-primary);
      font-weight: var(--font-weight-semibold);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-xl);
    }

    .allocation-card h3,
    .transactions-card h3 {
      font-size: var(--font-size-h4);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .allocation-legend {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
      padding-top: var(--spacing-lg);
      border-top: 1px solid var(--border-color);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .transactions-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background-color: var(--bg-primary);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
    }

    .transaction-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .transaction-symbol {
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      min-width: 50px;
    }

    .transaction-type {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: var(--bg-secondary);
      border-radius: var(--radius-sm);
    }

    .transaction-type.buy {
      color: var(--profit);
      background-color: rgba(34, 197, 94, 0.1);
    }

    .transaction-date {
      font-size: var(--font-size-caption);
      color: var(--text-muted);
    }

    .transaction-value {
      font-weight: var(--font-weight-semibold);
      color: var(--loss);
    }

    .transaction-value.positive {
      color: var(--profit);
    }

    .holdings-section {
      width: 100%;
    }

    .holdings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .holdings-header h2 {
      font-size: var(--font-size-h3);
      color: var(--text-primary);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .holdings-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-body);
    }

    .holdings-table thead {
      border-bottom: 2px solid var(--border-color);
    }

    .holdings-table th {
      padding: var(--spacing-md);
      text-align: left;
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      font-size: var(--font-size-caption);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .holdings-table td {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .holdings-table tbody tr:hover {
      background-color: var(--hover-bg);
    }

    .symbol-link {
      color: var(--accent-blue);
      text-decoration: none;
      font-weight: var(--font-weight-semibold);
      transition: all 0.3s ease;
    }

    .symbol-link:hover {
      text-decoration: underline;
    }

    .price-cell {
      text-align: right;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 1024px) {
      .kpi-section {
        grid-template-columns: repeat(2, 1fr);
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: var(--spacing-lg);
        gap: var(--spacing-lg);
      }

      .kpi-section {
        grid-template-columns: 1fr;
      }

      .time-filters {
        flex-wrap: wrap;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  totalValue = 287500000;
  dailyProfit = 2450000;
  totalReturn = 37500000;
  cashBalance = 12500000;

  selectedPeriod = '1M';
  timePeriods = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  topHoldings: StockHolding[] = [];
  recentTransactions: any[] = [];

  sectors = [
    { name: 'Banking', percentage: 35, color: '#3B82F6' },
    { name: 'Technology', percentage: 12, color: '#F59E0B' },
    { name: 'Steel', percentage: 18, color: '#8B5CF6' },
    { name: 'Agriculture', percentage: 13, color: '#10B981' },
    { name: 'Securities', percentage: 15, color: '#06B6D4' },
    { name: 'Cash', percentage: 7, color: '#6B7280' }
  ];

  portfolioChartOptions: any;
  allocationChartOptions: any;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadPortfolios();
    this.loadTransactions();
    this.initializeCharts();
  }

  private loadPortfolios(): void {
    this.stockService.getPortfolios().subscribe(portfolios => {
      if (portfolios.length > 0) {
        const mainPortfolio = portfolios[0];
        this.topHoldings = mainPortfolio.holdings.slice(0, 5);
      }
    });
  }

  private loadTransactions(): void {
    this.stockService.getTransactions().subscribe(transactions => {
      this.recentTransactions = transactions.slice(-5).reverse();
    });
  }

  private initializeCharts(): void {
    this.portfolioChartOptions = {
      backgroundColor: 'transparent',
      color: ['#22C55E', '#3B82F6', '#EF4444'],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.generateDateLabels(30),
        axisLabel: {
          color: '#9CA3AF',
          fontSize: 11
        },
        axisLine: {
          lineStyle: { color: '#374151' }
        },
        splitLine: {
          lineStyle: { color: '#1F2937' }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#9CA3AF',
          fontSize: 11
        },
        axisLine: {
          lineStyle: { color: '#374151' }
        },
        splitLine: {
          lineStyle: { color: '#1F2937' }
        }
      },
      series: [
        {
          name: 'Portfolio Value',
          type: 'line',
          data: this.generatePortfolioData(30),
          smooth: true,
          areaStyle: {
            color: 'rgba(34, 197, 94, 0.1)'
          },
          itemStyle: {
            color: '#22C55E'
          },
          lineStyle: {
            color: '#22C55E',
            width: 2
          },
          symbolSize: 0,
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            borderColor: '#374151',
            textStyle: { color: '#F9FAFB' }
          }
        }
      ]
    };

    this.allocationChartOptions = {
      backgroundColor: 'transparent',
      color: ['#3B82F6', '#F59E0B', '#8B5CF6', '#10B981', '#06B6D4', '#6B7280'],
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        borderColor: '#374151',
        textStyle: { color: '#F9FAFB' }
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '60%'],
          data: this.sectors.map(s => ({ value: s.percentage, name: s.name })),
          label: {
            color: '#D1D5DB',
            fontSize: 11
          },
          itemStyle: {
            borderColor: 'var(--bg-tertiary)',
            borderWidth: 2
          }
        }
      ]
    };
  }

  private generateDateLabels(days: number): string[] {
    const labels = [];
    for (let i = days; i > 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return labels;
  }

  private generatePortfolioData(days: number): number[] {
    const data = [];
    let baseValue = 250000000;
    for (let i = 0; i < days; i++) {
      baseValue += (Math.random() - 0.45) * 1000000;
      data.push(Math.max(240000000, baseValue));
    }
    return data;
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Start your day by reviewing your portfolio performance';
    if (hour < 18) return 'Keep track of your investments this afternoon';
    return 'Review your daily portfolio performance';
  }
}
