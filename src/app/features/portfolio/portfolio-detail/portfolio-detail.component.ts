import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from '@app/models';
import { PortfolioService } from '@app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="portfolio-detail"><p>Portfolio Detail - {{ portfolioId }}</p></div>`,
  styles: [`.portfolio-detail { padding: 2rem; }`]
})
export class PortfolioDetailComponent implements OnInit {
  portfolio: Portfolio | null = null;
  portfolioId = '';

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit(): void {
    this.portfolioId = this.route.snapshot.paramMap.get('id') || '';
    if (this.portfolioId) {
      this.loadPortfolio();
    }
  }

  private loadPortfolio(): void {
    this.portfolioService.getPortfolioById(this.portfolioId).subscribe({
      next: (data) => {
        this.portfolio = data;
      },
      error: (err) => console.error(err)
    });
  }
}
