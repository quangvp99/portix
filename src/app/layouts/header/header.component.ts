import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;
  searchQuery = '';
  isDarkMode = false;
  showNotifications = false;
  showUserMenu = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  logout(): void {
    this.authService.logout();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Search for:', this.searchQuery);
    }
  }
}
