import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><h1>Analytics</h1><p>Advanced portfolio analytics and insights</p></div>`,
  styles: [`.page-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }`]
})
export class AnalyticsComponent {}
