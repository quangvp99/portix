# Stock Portfolio Management Platform - Setup & Installation Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 20
- Git

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd stock-portfolio-management

# Install dependencies
npm install

# Or with yarn
yarn install
```

### 2. Install TailwindCSS (if not already done)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Environment

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.portfoliotrack.com/api'
};
```

## Running the Application

### Development Server

```bash
npm start
# or
ng serve
```

Application will be available at: `http://localhost:4200`

### Build for Production

```bash
npm run build
# or
ng build --configuration production
```

Output will be in: `dist/stock-portfolio/`

### Run Tests

```bash
npm test
# or
ng test
```

### Code Linting

```bash
npm run lint
# or
ng lint
```

## Project Setup Verification

After installation, verify the following:

### 1. File Structure
```bash
# Should see all directories created
ls src/app/
```

### 2. Dependencies Installed
```bash
npm list @angular/core
npm list tailwindcss
npm list @ngrx/store
```

### 3. Development Server Starts
```bash
npm start
# Should compile without errors
```

## First Time Users

### 1. Access Login Page
- Navigate to `http://localhost:4200/auth/login`
- Use test credentials (will need backend API)

### 2. Explore Dashboard
- After login, you'll see the dashboard
- Navigate using the sidebar
- Theme toggle available in header

### 3. Test Components
- Sidebar navigation works
- Header search is functional
- Theme switcher toggles dark/light mode
- User menu is interactive

## API Integration

### Backend Setup (Node.js/Express Example)

Create a simple backend to test:

```typescript
// backend/server.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  res.json({
    accessToken: 'mock_token_123',
    refreshToken: 'refresh_token_123',
    user: {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date()
    }
  });
});

// Portfolio endpoints
app.get('/api/portfolios', (req, res) => {
  res.json([
    {
      id: '1',
      name: 'Main Portfolio',
      currentValue: 150000,
      totalCost: 120000,
      unrealizedProfit: 30000,
      roi: 25,
      holdings: []
    }
  ]);
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
```

## Folder Creation Commands

If you need to manually create the folder structure:

```bash
# Create all directories
mkdir -p src/app/core/{guards,interceptors,services}
mkdir -p src/app/features/{auth/{login,register,forgot-password},dashboard,portfolio/{portfolio-list,portfolio-detail},transactions/transactions-list,market/market,watchlist/watchlist,analytics/analytics,reports/reports,profile/profile,settings/settings}
mkdir -p src/app/shared/components/{loading-spinner}
mkdir -p src/app/layouts/{main-layout,sidebar,header}
mkdir -p src/app/store
mkdir -p src/app/models
mkdir -p src/styles
mkdir -p src/environments
mkdir -p src/assets
```

## Configuration Files

### tsconfig.json - Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of:
import { AuthService } from '../../../core/services/auth.service';

// Write:
import { AuthService } from '@app/core/services/auth.service';
```

Available aliases:
- `@app/*` → `src/app/*`
- `@core/*` → `src/app/core/*`
- `@shared/*` → `src/app/shared/*`
- `@features/*` → `src/app/features/*`
- `@models/*` → `src/app/models/*`
- `@services/*` → `src/app/services/*`
- `@store/*` → `src/app/store/*`
- `@layouts/*` → `src/app/layouts/*`
- `@guards/*` → `src/app/core/guards/*`
- `@interceptors/*` → `src/app/core/interceptors/*`
- `@environments/*` → `src/environments/*`

## Tailwind CSS Setup

### tailwind.config.js

Already configured with:
- Dark mode support
- Custom color palette (Primary, Success, Danger, Warning)
- Extended spacing and border radius
- Responsive breakpoints
- Custom shadows

### Available Utility Classes

```html
<!-- Colors -->
<div class="text-primary">Primary text</div>
<div class="text-success">Success text</div>
<div class="text-danger">Danger text</div>

<!-- Dark/Light Mode -->
<div class="dark:bg-dark-bg">Adapts to dark mode</div>
<div class="light:bg-light-bg">Adapts to light mode</div>

<!-- Responsive -->
<div class="md:grid-cols-2 lg:grid-cols-3">Responsive grid</div>
```

## Theme Management

### Toggle Dark/Light Mode

```typescript
// In component
toggleTheme(): void {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

### Default Theme Detection

```typescript
// Uses system preference if no saved preference
const isDark = localStorage.getItem('theme') === 'dark' ||
  (!localStorage.getItem('theme') && 
   window.matchMedia('(prefers-color-scheme: dark)').matches);
```

## Debugging

### Enable Debug Mode

```typescript
// In main.ts
import { enableDebugTools } from '@angular/platform-browser';
import { NgZone } from '@angular/core';

enableDebugTools(componentRef);
```

### Use Angular DevTools

Install Angular DevTools browser extension for debugging.

## Performance Testing

### Build Size Analysis

```bash
# Generate bundle analysis
ng build --stats-json
npm run webpack-bundle-analyzer

# Or use source-map-explorer
npm install -g source-map-explorer
source-map-explorer dist/stock-portfolio/browser/main.*.js
```

### Runtime Performance

Use Chrome DevTools:
1. Open DevTools (F12)
2. Go to Performance tab
3. Record user interactions
4. Analyze results

## Troubleshooting

### Port Already in Use

```bash
# Use a different port
ng serve --port 4201
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### TypeScript Compilation Errors

```bash
# Check strict mode compliance
ng serve --strict
```

### Tailwind Styles Not Applying

```bash
# Rebuild Tailwind CSS
npm run build:tailwind

# Or restart dev server
ng serve
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: All modern versions

## Environment Variables

Create `.env` file (not committed to git):

```env
NG_APP_API_URL=http://localhost:3000/api
NG_APP_ENVIRONMENT=development
NG_APP_VERSION=1.0.0
```

Access in code:
```typescript
const apiUrl = process.env['NG_APP_API_URL'];
```

## Next Steps

1. Set up backend API server
2. Implement data persistence
3. Add WebSocket for real-time updates
4. Integrate ECharts for advanced charting
5. Add comprehensive testing
6. Set up CI/CD pipeline
7. Deploy to production server

## Support

For issues or questions:
1. Check ARCHITECTURE.md for design overview
2. Review component comments
3. Check Angular documentation
4. Review API integration examples
