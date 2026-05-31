import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Portfolio } from '@app/models';
import { PortfolioService } from '@app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit, OnDestroy {
  portfolios: Portfolio[] = [];
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadPortfolios();
  }

  private loadPortfolios(): void {
    this.portfolioService.getPortfolios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.portfolios = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load portfolios';
          this.loading = false;
          console.error(err);
        }
      });
  }

  deletePortfolio(id: string): void {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      this.portfolioService.deletePortfolio(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.portfolios = this.portfolios.filter(p => p.id !== id);
          },
          error: (err) => {
            this.error = 'Failed to delete portfolio';
            console.error(err);
          }
        });
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
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
