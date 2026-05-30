import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClass"
      [disabled]="disabled"
      (click)="onClick.emit()"
      [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: var(--spacing-md) var(--spacing-lg);
      border: none;
      border-radius: var(--radius-md);
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: var(--font-family);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      white-space: nowrap;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: var(--primary-green);
      color: var(--bg-primary);
      font-weight: var(--font-weight-semibold);
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #16A34A;
      box-shadow: var(--shadow-md);
    }

    .btn-secondary {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: var(--hover-bg);
      border-color: var(--accent-blue);
    }

    .btn-ghost {
      background-color: transparent;
      color: var(--text-secondary);
      border: 1px solid transparent;
    }

    .btn-ghost:hover:not(:disabled) {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .btn-danger {
      background-color: var(--loss);
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background-color: #DC2626;
      box-shadow: var(--shadow-md);
    }

    .btn-sm {
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-size-caption);
    }

    .btn-lg {
      padding: var(--spacing-lg) var(--spacing-xl);
      font-size: var(--font-size-body-lg);
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() onClick = { emit: () => {} };

  get buttonClass(): string {
    const classes = ['btn-' + this.variant];
    if (this.size !== 'md') classes.push('btn-' + this.size);
    return classes.join(' ');
  }
}
