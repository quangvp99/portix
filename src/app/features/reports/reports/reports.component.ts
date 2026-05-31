import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><h1>Reports</h1><p>Generate and export portfolio reports</p></div>`,
  styles: [`.page-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }`]
})
export class ReportsComponent {}
