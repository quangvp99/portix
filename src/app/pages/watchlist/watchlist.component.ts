import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock.model';
import { CardComponent } from '../../shared/components/card/card.component';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, RouterLink, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="watchlist">
      <div class="watchlist-header">
        <h1>Watchlist</h1>
        <app-button variant="primary">+ Add Stock</app-button>
      </div>

      <app-card class="watchlist-card">
        <div class="table-controls">
          <input type="text" placeholder="Search stocks..." class="search-input">
          <select class="filter-select">
            <option>All Stocks</option>
            <option>Gainers</option>
            <option>Losers</option>
          </select>
        </div>

        <div class="table-wrapper">
          <table class="watchlist-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th>Last Price</th>
                <th>Change</th>
                <th>Change %</th>
                <th>Volume</th>
                <th>Market Cap</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let stock of stocks" [class.gainer]="stock.change > 0" [class.loser]="stock.change < 0">
                <td>
                  <a [routerLink]="['/stock', stock.symbol]" class="symbol-link">
                    {{ stock.symbol }}
                  </a>
                </td>
                <td class="company-name">{{ stock.name }}</td>
                <td class="price-cell">{{ stock.currentPrice | number: '1.2-2' }}</td>
                <td [class.positive]="stock.change > 0" [class.negative]="stock.change < 0">
                  {{ (stock.change > 0 ? '+' : '') }}{{ stock.change | number: '1.2-2' }}
                </td>
                <td>
                  <app-badge [variant]="stock.changePercent >= 0 ? 'profit' : 'loss'">
                    {{ (stock.changePercent >= 0 ? '+' : '') }}{{ stock.changePercent | number: '1.2-2' }}%
                  </app-badge>
                </td>
                <td class="price-cell">{{ stock.volume | number: '1.0-0' }}</td>
                <td class="price-cell">{{ (stock.marketCap / 1e9) | number: '1.0-0' }}B</td>
                <td>
                  <button class="action-btn" title="Remove from watchlist">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    .watchlist {
      padding: var(--spacing-xl);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }

    .watchlist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
    }

    .watchlist-header h1 {
      font-size: var(--font-size-h2);
      color: var(--text-primary);
    }

    .watchlist-card {
      width: 100%;
    }

    .table-controls {
      display: flex;
      gap: var(--spacing-lg);
      margin-bottom: var(--spacing-lg);
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

    .watchlist-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-body);
    }

    .watchlist-table thead {
      border-bottom: 2px solid var(--border-color);
    }

    .watchlist-table th {
      padding: var(--spacing-md);
      text-align: left;
      font-weight: var(--font-weight-semibold);
      color: var(--text-secondary);
      font-size: var(--font-size-caption);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .watchlist-table td {
      padding: var(--spacing-lg);
      border-bottom: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .watchlist-table tbody tr {
      transition: all 0.3s ease;
    }

    .watchlist-table tbody tr:hover {
      background-color: var(--hover-bg);
    }

    .watchlist-table tbody tr.gainer {
      border-left: 3px solid var(--profit);
    }

    .watchlist-table tbody tr.loser {
      border-left: 3px solid var(--loss);
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

    .positive {
      color: var(--profit);
      font-weight: var(--font-weight-semibold);
    }

    .negative {
      color: var(--loss);
      font-weight: var(--font-weight-semibold);
    }

    .action-btn {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      transition: all 0.3s ease;
    }

    .action-btn:hover {
      transform: scale(1.2);
    }

    @media (max-width: 768px) {
      .watchlist {
        padding: var(--spacing-lg);
      }

      .watchlist-header {
        flex-direction: column;
        gap: var(--spacing-lg);
      }

      .watchlist-header app-button {
        width: 100%;
      }

      .table-controls {
        flex-direction: column;
      }

      .search-input,
      .filter-select {
        width: 100%;
      }

      .watchlist-table th {
        font-size: 10px;
        padding: var(--spacing-md);
      }
    }
  `]
})
export class WatchlistComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }
}
