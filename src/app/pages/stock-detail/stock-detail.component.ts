import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { StockService } from '../../services/stock.service';
import { Stock, HistoricalPrice } from '../../models/stock.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxEchartsModule,
    CardComponent,
    BadgeComponent,
    ButtonComponent
  ],
  template: `
    <div class="stock-detail" *ngIf="stock">
      <!-- Header Section -->
      <div class="detail-header">
        <div class="header-left">
          <h1>{{ stock.name }}</h1>
          <div class="header-meta">
            <span class="symbol">{{ stock.symbol }}</span>
            <span class="sector">{{ stock.sector }}</span>
            <span class="exchange">HOSE</span>
          </div>
        </div>
        <div class="header-right">
          <div class="price-info">
            <div class="current-price">{{ stock.currentPrice | number: '1.2-2' }}</div>
            <app-badge
              [variant]="stock.change >= 0 ? 'profit' : 'loss'">
              {{ (stock.change >= 0 ? '+' : '') }}{{ stock.change | number: '1.2-2' }}
              ({{ (stock.changePercent >= 0 ? '+' : '') }}{{ stock.changePercent | number: '1.2-2' }}%)
            </app-badge>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <!-- Main Chart -->
        <div class="chart-area">
          <app-card>
            <div class="chart-controls">
              <div class="time-filters">
                <button *ngFor="let period of timePeriods"
                  [class.active]="period === selectedPeriod"
                  (click)="selectedPeriod = period"
                  class="time-filter-btn">
                  {{ period }}
                </button>
              </div>
              <div class="indicators">
                <label class="indicator-toggle">
                  <input type="checkbox" [(ngModel)]="showMA20"> MA20
                </label>
                <label class="indicator-toggle">
                  <input type="checkbox" [(ngModel)]="showMA50"> MA50
                </label>
                <label class="indicator-toggle">
                  <input type="checkbox" [(ngModel)]="showVolume"> Volume
                </label>
              </div>
            </div>
            <div echarts [options]="candlestickChartOptions" style="height: 400px;"></div>
          </app-card>
        </div>

        <!-- Sidebar -->
        <div class="sidebar-area">
          <!-- Stock Statistics -->
          <app-card>
            <h3>Statistics</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">Open</span>
                <span class="stat-value">{{ stock.open | number: '1.2-2' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">High</span>
                <span class="stat-value text-profit">{{ stock.high | number: '1.2-2' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Low</span>
                <span class="stat-value text-loss">{{ stock.low | number: '1.2-2' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Close</span>
                <span class="stat-value">{{ stock.currentPrice | number: '1.2-2' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Volume</span>
                <span class="stat-value">{{ stock.volume | number: '1.0-0' }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Market Cap</span>
                <span class="stat-value">{{ (stock.marketCap / 1e9) | number: '1.0-0' }}B</span>
              </div>
            </div>
          </app-card>

          <!-- Valuation Metrics -->
          <app-card>
            <h3>Valuation</h3>
            <div class="metrics-list">
              <div class="metric-row">
                <span class="metric-label">P/E Ratio</span>
                <span class="metric-value">{{ stock.pe | number: '1.1-1' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">P/B Ratio</span>
                <span class="metric-value">{{ stock.pb | number: '1.1-1' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">EPS</span>
                <span class="metric-value">{{ stock.eps | number: '1.2-2' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Dividend Yield</span>
                <span class="metric-value text-profit">{{ stock.dividendYield }}%</span>
              </div>
            </div>
          </app-card>

          <!-- Actions -->
          <div class="actions">
            <app-button variant="primary" (click)="onBuy()">Buy</app-button>
            <app-button variant="secondary" (click)="onAddToWatchlist()">
              Add to Watchlist
            </app-button>
          </div>
        </div>
      </div>

      <!-- Historical Prices Table -->
      <app-card class="history-section">
        <h2>Historical Prices</h2>
        <div class="table-wrapper">
          <table class="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let price of historicalPrices | slice: 0: 10">
                <td>{{ price.date | date: 'MMM dd, yyyy' }}</td>
                <td class="price-cell">{{ price.open | number: '1.2-2' }}</td>
                <td class="price-cell text-profit">{{ price.high | number: '1.2-2' }}</td>
                <td class="price-cell text-loss">{{ price.low | number: '1.2-2' }}</td>
                <td class="price-cell">{{ price.close | number: '1.2-2' }}</td>
                <td class="price-cell">{{ price.volume | number: '1.0-0' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-card>

      <!-- Company Overview -->
      <app-card class="overview-section">
        <h2>Company Overview</h2>
        <div class="overview-content">
          <div class="overview-item">
            <span class="overview-label">Business Description</span>
            <p>{{ stock.name }} is a leading financial institution providing banking and investment services in Vietnam.</p>
          </div>
          <div class="overview-item">
            <span class="overview-label">Industry</span>
            <p>{{ stock.sector }}</p>
          </div>
          <div class="overview-item">
            <span class="overview-label">Website</span>
            <p><a href="#" class="link">www.example.com</a></p>
          </div>
        </div>
      </app-card>
    </div>

    <div *ngIf="!stock" class="loading">
      Loading stock data...
    </div>
  `,
  styles: [`
    .stock-detail {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .detail-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
      margin-bottom: var(--spacing-md);
    }

    .header-meta {
      display: flex;
      gap: var(--spacing-lg);
      font-size: var(--font-size-caption);
    }

    .symbol {
      font-weight: var(--font-weight-bold);
      color: var(--accent-blue);
    }

    .sector,
    .exchange {
      color: var(--text-secondary);
      padding: var(--spacing-xs) var(--spacing-md);
      background-color: var(--bg-tertiary);
      border-radius: var(--radius-sm);
    }

    .price-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: var(--spacing-md);
    }

    .current-price {
      font-size: 32px;
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
    }

    .detail-content {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--spacing-xl);
    }

    .chart-area {
      width: 100%;
    }

    .chart-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
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
      background-color: var(--primary-green);
      color: var(--bg-primary);
    }

    .indicators {
      display: flex;
      gap: var(--spacing-lg);
    }

    .indicator-toggle {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
      user-select: none;
    }

    .indicator-toggle input {
      cursor: pointer;
      accent-color: var(--primary-green);
    }

    .sidebar-area {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .sidebar-area app-card h3 {
      font-size: var(--font-size-h4);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-md);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .stat-label {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      font-size: var(--font-size-h4);
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      font-family: 'Courier New', monospace;
    }

    .metrics-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background-color: var(--bg-primary);
      border-radius: var(--radius-sm);
    }

    .metric-label {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    .metric-value {
      font-weight: var(--font-weight-semibold);
      color: var(--text-primary);
      font-family: 'Courier New', monospace;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .actions app-button {
      width: 100%;
    }

    .history-section,
    .overview-section {
      width: 100%;
    }

    .history-section h2,
    .overview-section h2 {
      font-size: var(--font-size-h3);
      color: var(--text-primary);
      margin-bottom: var(--spacing-lg);
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .history-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-body);
    }

    .history-table thead {
      border-bottom: 2px solid var(--border-color);
    }

    .history-table th {
      padding: var(--spacing-md);
      text-align: left;
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      font-size: var(--font-size-caption);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .history-table td {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .history-table tbody tr:hover {
      background-color: var(--hover-bg);
    }

    .price-cell {
      text-align: right;
      font-family: 'Courier New', monospace;
    }

    .overview-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .overview-item {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .overview-label {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .overview-content p {
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .link {
      color: var(--accent-blue);
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }

    .loading {
      padding: var(--spacing-3xl);
      text-align: center;
      color: var(--text-secondary);
    }

    .text-profit {
      color: var(--profit);
    }

    .text-loss {
      color: var(--loss);
    }

    @media (max-width: 1024px) {
      .detail-content {
        grid-template-columns: 1fr;
      }

      .chart-controls {
        flex-direction: column;
        gap: var(--spacing-lg);
      }
    }

    @media (max-width: 768px) {
      .stock-detail {
        padding: var(--spacing-lg);
      }

      .detail-header {
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .header-meta {
        flex-wrap: wrap;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StockDetailComponent implements OnInit {
  stock: Stock | undefined;
  historicalPrices: HistoricalPrice[] = [];

  selectedPeriod = '1M';
  timePeriods = ['1D', '1W', '1M', '3M', '6M', '1Y'];

  showMA20 = true;
  showMA50 = false;
  showVolume = true;

  candlestickChartOptions: any;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const symbol = params['symbol'];
      this.loadStock(symbol);
    });
  }

  private loadStock(symbol: string): void {
    this.stockService.getStock(symbol).subscribe(stock => {
      this.stock = stock;
      this.loadHistoricalPrices(symbol);
    });
  }

  private loadHistoricalPrices(symbol: string): void {
    this.stockService.getHistoricalPrices(symbol).subscribe(prices => {
      this.historicalPrices = prices;
      this.initializeCandlestickChart();
    });
  }

  private initializeCandlestickChart(): void {
    const candleData = this.historicalPrices.map(p => [p.open, p.close, p.low, p.high]);
    const dates = this.historicalPrices.map(p => p.date);

    this.candlestickChartOptions = {
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
        data: dates,
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
          type: 'candlestick',
          data: candleData,
          itemStyle: {
            color: '#22C55E',
            color0: '#EF4444',
            borderColor: '#22C55E',
            borderColor0: '#EF4444'
          }
        }
      ]
    };
  }

  onBuy(): void {
    // Open buy dialog
    alert('Buy dialog would open for ' + this.stock?.symbol);
  }

  onAddToWatchlist(): void {
    alert('Added ' + this.stock?.symbol + ' to watchlist');
  }
}
