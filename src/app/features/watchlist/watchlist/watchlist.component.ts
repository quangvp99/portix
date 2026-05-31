import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><h1>Watchlist</h1><p>Monitor your favorite stocks</p></div>`,
  styles: [`.page-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }`]
})
export class WatchlistComponent {}
