import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class.loading-spinner]="true" [class.sm]="size === 'sm'" [class.md]="size === 'md'" [class.lg]="size === 'lg'">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .loading-spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &.sm .spinner {
        width: 16px;
        height: 16px;
        border-width: 2px;
      }

      &.md .spinner {
        width: 24px;
        height: 24px;
        border-width: 3px;
      }

      &.lg .spinner {
        width: 32px;
        height: 32px;
        border-width: 4px;
      }
    }

    .spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: rgba(255, 255, 255, 1);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
