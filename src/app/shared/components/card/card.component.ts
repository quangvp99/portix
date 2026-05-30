import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.interactive]="interactive">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .card {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-sm);
    }

    .card.interactive {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .card.interactive:hover {
      background-color: var(--hover-bg);
      border-color: var(--accent-blue);
      box-shadow: var(--shadow-md);
    }
  `]
})
export class CardComponent {
  @Input() interactive = false;
}
