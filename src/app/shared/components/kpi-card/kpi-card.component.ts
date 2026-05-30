import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card">
      <div class="kpi-header">
        <span class="kpi-label">{{ label }}</span>
        <span class="kpi-change" [class.positive]="isPositive" [class.negative]="!isPositive">
          {{ isPositive ? '+' : '' }}{{ changePercent }}%
        </span>
      </div>
      <div class="kpi-value">{{ value | number }}</div>
      <div class="kpi-change-text" [class.positive]="isPositive" [class.negative]="!isPositive">
        {{ changeText }}
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background-color: var(--bg-tertiary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kpi-label {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-medium);
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .kpi-change {
      font-size: var(--font-size-caption);
      font-weight: var(--font-weight-semibold);
    }

    .kpi-change.positive {
      color: var(--profit);
    }

    .kpi-change.negative {
      color: var(--loss);
    }

    .kpi-value {
      font-size: 28px;
      font-weight: var(--font-weight-bold);
      color: var(--text-primary);
      line-height: 1.2;
    }

    .kpi-change-text {
      font-size: var(--font-size-caption);
      color: var(--text-secondary);
    }

    .kpi-change-text.positive {
      color: var(--profit);
    }

    .kpi-change-text.negative {
      color: var(--loss);
    }
  `]
})
export class KpiCardComponent {
  @Input() label = 'Metric';
  @Input() value = 0;
  @Input() changePercent = 0;
  @Input() changeText = 'vs last week';

  get isPositive(): boolean {
    return this.changePercent >= 0;
  }
}
