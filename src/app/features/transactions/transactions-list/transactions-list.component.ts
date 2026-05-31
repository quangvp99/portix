import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@app/models';
import { TransactionService } from '@app/core/services/transaction.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="transactions-container">
      <div class="page-header">
        <h1>Transactions</h1>
        <p>View and manage all your stock transactions</p>
      </div>
      <div *ngIf="loading" class="loading">Loading transactions...</div>
      <div *ngIf="!loading && transactions.length > 0" class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let tx of transactions">
              <td>{{ tx.date | date:'short' }}</td>
              <td class="symbol">{{ tx.symbol }}</td>
              <td><span class="badge" [class.buy]="tx.type === 'BUY'">{{ tx.type }}</span></td>
              <td>{{ tx.quantity }}</td>
              <td>{{ formatCurrency(tx.price) }}</td>
              <td>{{ formatCurrency(tx.totalValue) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .transactions-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }
    .page-header { margin-bottom: 2rem; }
    .page-header h1 { font-size: 32px; font-weight: 700; margin: 0; }
    .page-header p { color: #94A3B8; font-size: 14px; margin: 0.5rem 0 0; }
    .table-wrapper { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--color-border); }
    th { background-color: rgba(0, 0, 0, 0.05); font-weight: 600; }
    .symbol { color: var(--color-primary); font-weight: 600; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge.buy { background-color: rgba(16, 185, 129, 0.2); color: var(--color-success); }
    .loading { text-align: center; padding: 2rem; color: #94A3B8; }
  `]
})
export class TransactionsListComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data: any) => {
        this.transactions = data.data || [];
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}
