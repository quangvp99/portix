import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClass">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    span {
      display: inline-flex;
      align-items: center;
      padding: var(--spacing-xs) var(--spacing-md);
      border-radius: var(--radius-sm);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-semibold);
      white-space: nowrap;
    }

    .badge-profit {
      background-color: rgba(34, 197, 94, 0.1);
      color: var(--profit);
    }

    .badge-loss {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--loss);
    }

    .badge-neutral {
      background-color: rgba(148, 163, 184, 0.1);
      color: var(--neutral);
    }

    .badge-default {
      background-color: var(--bg-secondary);
      color: var(--text-secondary);
    }
  `]
})
export class BadgeComponent {
  @Input() variant: 'profit' | 'loss' | 'neutral' | 'default' = 'default';

  get badgeClass(): string {
    return 'badge-' + this.variant;
  }
}
