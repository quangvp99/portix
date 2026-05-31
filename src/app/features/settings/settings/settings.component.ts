import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="page-container"><h1>Settings</h1><p>Manage your account preferences and security</p></div>`,
  styles: [`.page-container { padding: 2rem; max-width: 1920px; margin: 0 auto; }`]
})
export class SettingsComponent {}
