import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { StockService } from '../../services/stock.service';
import { Portfolio } from '../../models/stock.model';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-portfolio-detail',
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
    <div class="portfolio-detail" *ngIf="portfolio">
      <div class="portfolio-header">
        <div class="header-content">
          <h1>{{ portfolio.name }}</h1>
          <div class="header-stats">
            <div class="stat">
              <span class="stat-label">Current Value</span>
              <span class="stat-value">{{ portfolio.currentValue | number: '1.0-0' }}</span>
            </div>
            <div class="stat divider">
              <span class="stat-label">Profit/Loss</span>
              <span class="stat-value" [class.positive]="portfolio.profitLossPercent >= 0">
                {{ portfolio.profitLossPercent }}%
              </span>
            </div>
            <div class="stat">
              <span class="stat-label">Holdings</span>
              <span class="stat-value">{{ portfolio.holdings.length }}</span>
            </div>
          </div>
        </div>
        <app-button variant="primary">Add Transaction</app-button>
      </div>

      <!-- Summary Cards -->
      <div class="summary-grid">
        <app-kpi-card
          label="Invested Capital"
          [value]="portfolio.investedCapital"
          [changePercent]="0"
          [changeText]="'initial investment'">
        </app-kpi-card>
        <app-kpi-card
          label="Market Value"
          [value]="portfolio.currentValue"
          [changePercent]="5"
          [changeText]="'vs last week'">
        </app-kpi-card>
        <app-kpi-card
          label="Unrealized Profit"
          [value]="portfolio.profitLoss"
          [changePercent]="portfolio.profitLossPercent"
          [changeText]="'total return'">
        </app-kpi-card>
        <app-kpi-card
          label="Dividend Income"
          [value]="1250000"
          [changePercent]="8"
          [changeText]="'ytd'">
        </app-kpi-card>
      </div>

      <!-- Performance Chart -->
      <app-card>
        <div class="chart-header">
          <h2>Performance</h2>
          <div class="time-filters">
            <button *ngFor="let period of timePeriods"
              [class.active]="period === selectedPeriod"
              (click)="selectedPeriod = period"
              class="time-filter-btn">
              {{ period }}
            </button>
          </div>
        </div>
        <div echarts [options]="performanceChartOptions" style="height: 350px;"></div>
      </app-card>

      <!-- Holdings Table -->
      <app-card class="holdings-section">
        <div class="holdings-header">
          <h2>Holdings</h2>
          <div class="table-controls">
            <input type="text" placeholder="Search holdings..." class="search-input">
            <app-button variant="secondary" size="sm">Filter</app-button>
          </div>
        </div>
        <div class="table-wrapper">
          <table class="holdings-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Quantity</th>
                <th>Avg Cost</th>
                <th>Current Price</th>
                <th>Market Value</th>
                <th>Weight %</th>
                <th>P/L</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let holding of portfolio.holdings">
                <td>
                  <a [routerLink]="['/stock', holding.symbol]" class="symbol-link">
                    {{ holding.symbol }}
                  </a>
                </td>
                <td class="company-name">Holding Company {{ holding.symbol }}</td>
                <td>{{ holding.quantity | number }}</td>
                <td class="price-cell">{{ holding.avgCost | number: '1.2-2' }}</td>
                <td class="price-cell">{{ holding.currentPrice | number: '1.2-2' }}</td>
                <td class="price-cell">
                  {{ (holding.quantity * holding.currentPrice) | number: '1.0-0' }}
                </td>
                <td>{{ holding.weight }}%</td>
                <td>
                  <app-badge
                    [variant]="(holding.currentPrice - holding.avgCost) > 0 ? 'profit' : 'loss'">
                    {{ ((holding.currentPrice - holding.avgCost) / holding.avgCost * 100) | number: '1.1-1' }}%
                  </app-badge>
                </td>
                <td>
                  <button class="action-btn" title="Edit">✏️</button>
                  <button class="action-btn delete" title="Sell">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-card>

      <!-- Transaction History -->
      <app-card class="transactions-section">
        <div class="transactions-header">
          <h2>Transaction History</h2>
          <div class="transaction-filters">
            <select class="filter-select">
              <option>All Types</option>
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
        </div>
        <div class="transactions-list">
          <div class="transaction-row" *ngFor="let i of [1,2,3,4,5]">
            <div class="transaction-date">{{ getRandomDate() }}</div>
            <div class="transaction-details">
              <span class="transaction-symbol">ACB</span>
              <span class="transaction-type buy">BUY</span>
              <span class="transaction-amount">5,000 shares @ 31.50</span>
            </div>
            <div class="transaction-value">157,500.00</div>
          </div>
        </div>
      </app-card>
    </div>

    <div *ngIf="!portfolio" class="loading">
      Loading portfolio...
    </div>
  `,
  styles: [`
    .portfolio-detail {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .portfolio-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: var(--spacing-xl);
      background-color: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      gap: var(--spacing-xl);
    }

    .header-content {
      flex: 1;
    }

    .portfolio-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .header-stats {
      display: flex;
      gap: var(--spacing-2xl);
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .stat.divider {
      padding-left: var(--spacing-2xl);
      border-left: 1px solid var(--border-color);
    }

    .stat-label {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: var(--font-size-h3);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
    }

    .stat-value.positive {
      color: var(--profit);
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-lg);
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .chart-header h2 {
      font-size: var(--font-size-h3);
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

    .time-filter-btn:hover,
    .time-filter-btn.active {
      border-color: var(--primary-green);
      color: var(--primary-green);
      background-color: var(--primary-green);
      color: var(--bg-primary);
    }

    .holdings-section,
    .transactions-section {
      width: 100%;
    }

    .holdings-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .holdings-header h2,
    .transactions-header h2 {
      font-size: var(--font-size-h3);
    }

    .table-controls,
    .transaction-filters {
      display: flex;
      gap: var(--spacing-md);
      align-items: center;
    }

    .search-input,
    .filter-select {
      padding: var(--spacing-md) var(--spacing-lg);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-size: var(--font-size-body);
      font-family: var(--font-family);
    }

    .search-input::placeholder {
      color: var(--text-muted);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .holdings-table {
      width: 100%;
      border-collapse: collapse;
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
    }

    .symbol-link:hover {
      text-decoration: underline;
    }

    .company-name {
      color: var(--text-secondary);
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price-cell {
      text-align: right;
      font-family: 'Courier New', monospace;
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      transition: all 0.3s ease;
      margin-right: var(--spacing-md);
    }

    .action-btn:hover {
      transform: scale(1.2);
    }

    .action-btn.delete {
      color: var(--loss);
    }

    .transactions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .transactions-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .transaction-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-lg);
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      transition: all 0.3s ease;
    }

    .transaction-row:hover {
      background-color: var(--hover-bg);
    }

    .transaction-date {
      color: var(--text-secondary);
      font-size: var(--font-size-caption);
      min-width: 80px;
    }

    .transaction-details {
      flex: 1;
      display: flex;
      gap: var(--spacing-lg);
      align-items: center;
    }

    .transaction-symbol {
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      min-width: 50px;
    }

    .transaction-type {
      font-size: var(--font-size-caption);
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: rgba(34, 197, 94, 0.1);
      color: var(--profit);
      border-radius: var(--radius-sm);
      font-weight: var(--font-weight-semibold);
    }

    .transaction-amount {
      color: var(--text-secondary);
    }

    .transaction-value {
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
    }

    .loading {
      padding: var(--spacing-3xl);
      text-align: center;
      color: var(--text-secondary);
    }

    @media (max-width: 1024px) {
      .summary-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .header-stats {
        gap: var(--spacing-lg);
      }

      .stat.divider {
        padding-left: var(--spacing-lg);
      }
    }

    @media (max-width: 768px) {
      .portfolio-detail {
        padding: var(--spacing-lg);
      }

      .portfolio-header {
        flex-direction: column;
      }

      .header-stats {
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .stat.divider {
        padding-left: 0;
        border-left: none;
        border-top: 1px solid var(--border-color);
        padding-top: var(--spacing-lg);
      }

      .summary-grid {
        grid-template-columns: 1fr;
      }

      .holdings-table {
        font-size: var(--font-size-caption);
      }

      .holdings-table th,
      .holdings-table td {
        padding: var(--spacing-md);
      }
    }
  `]
})
export class PortfolioDetailComponent implements OnInit {
  portfolio: Portfolio | undefined;
  selectedPeriod = '1M';
  timePeriods = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  performanceChartOptions: any;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.stockService.getPortfolio(id).subscribe(portfolio => {
        this.portfolio = portfolio;
        this.initializeCharts();
      });
    });
  }

  private initializeCharts(): void {
    this.performanceChartOptions = {
      backgroundColor: 'transparent',
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
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#9CA3AF', fontSize: 11 },
        axisLine: { lineStyle: { color: '#374151' } },
        splitLine: { lineStyle: { color: '#1F2937' } }
      },
      series: [
        {
          type: 'line',
          data: this.generatePortfolioData(30),
          smooth: true,
          areaStyle: { color: 'rgba(34, 197, 94, 0.1)' },
          itemStyle: { color: '#22C55E' },
          lineStyle: { color: '#22C55E', width: 2 },
          symbolSize: 0
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

  getRandomDate(): string {
    const dates = ['Today', 'Yesterday', '2 days ago', '3 days ago', '1 week ago'];
    return dates[Math.floor(Math.random() * dates.length)];
  }
}
