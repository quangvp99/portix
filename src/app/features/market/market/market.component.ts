import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><h1>Market</h1><p>Stock market overview and search</p></div>`,
  styles: [`.page-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }`]
})
export class MarketComponent {}
