# Stock Portfolio Management Platform - Architecture Guide

## Project Overview

A professional, production-ready stock portfolio management platform built with Angular 20, TypeScript, TailwindCSS, and NgRx. Inspired by premium fintech platforms like TradingView, FireAnt, and SSI iBoard.

## Tech Stack

- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript 5.5
- **Styling**: TailwindCSS 3.4 + SCSS
- **State Management**: NgRx 18
- **HTTP Client**: Angular HttpClient with Interceptors
- **Charts**: Apache ECharts
- **Routing**: Angular Router with lazy loading
- **Authentication**: JWT (Access Token in memory, Refresh Token in HttpOnly Cookie)

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── guards/              # Route guards (AuthGuard)
│   │   ├── interceptors/        # HTTP interceptors (Auth, Error handling)
│   │   └── services/            # Core services (Auth, Portfolio, Market, etc.)
│   │
│   ├── features/
│   │   ├── auth/                # Authentication module
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── dashboard/           # Dashboard module
│   │   ├── portfolio/           # Portfolio management
│   │   ├── transactions/        # Transaction management
│   │   ├── market/              # Market data & search
│   │   ├── watchlist/           # Watchlist management
│   │   ├── analytics/           # Analytics & insights
│   │   ├── reports/             # Report generation
│   │   ├── profile/             # User profile
│   │   └── settings/            # Settings
│   │
│   ├── shared/
│   │   └── components/          # Reusable components
│   │
│   ├── layouts/
│   │   ├── main-layout/         # Main app layout
│   │   ├── sidebar/             # Navigation sidebar
│   │   └── header/              # Top header
│   │
│   ├── models/                  # TypeScript interfaces
│   ├── store/                   # NgRx store (ready for expansion)
│   ├── app.component.ts         # Root component
│   └── app.routes.ts            # Route definitions
│
├── styles/
│   ├── global.scss              # Global styles & design tokens
│   └── tailwind.css             # Tailwind directives
│
├── environments/
│   ├── environment.ts           # Development config
│   └── environment.prod.ts      # Production config
│
├── assets/                      # Images, icons, etc.
├── index.html                   # HTML entry point
├── main.ts                      # Application bootstrap
├── tailwind.config.js           # Tailwind configuration
├── angular.json                 # Angular CLI config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## Core Services

### AuthService
- Handles user authentication (login, register, forgot password)
- Manages JWT tokens (Access & Refresh)
- Provides current user observable
- Handles token refresh flow

### PortfolioService
- CRUD operations for portfolios
- Holdings management
- Portfolio metrics calculation

### MarketService
- Stock search and filtering
- Market index data (VN30, VN100, HNX30, UPCOM)
- OHLC candlestick data
- Benchmark comparison

### TransactionService
- Transaction CRUD operations
- Paginated transaction listings
- Recent transaction fetching

### WatchlistService
- Watchlist management
- Symbol addition/removal
- Watchlist stock data fetching

## State Management (NgRx - Ready for Expansion)

Current structure supports adding the following stores:

```typescript
// Auth Store
- Auth state (authenticated, user, loading, error)
- Effects: Login, Register, Logout, Refresh Token
- Selectors: Current user, Auth status

// Portfolio Store
- Portfolio list and detail
- Holdings management
- Real-time updates

// Market Store
- Stock quotes
- Market indices
- Search results

// Watchlist Store
- User watchlists
- Symbol management

// Transaction Store
- Transaction history
- Transaction creation
```

## API Integration

All HTTP requests go through interceptors:

1. **Auth Interceptor**: Adds JWT token to requests
2. **Error Interceptor**: Handles 401/403 errors, network issues

### Expected API Endpoints

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/refresh-token

GET    /api/portfolios
POST   /api/portfolios
GET    /api/portfolios/:id
PUT    /api/portfolios/:id
DELETE /api/portfolios/:id
GET    /api/portfolios/:id/holdings
POST   /api/portfolios/:id/holdings

GET    /api/transactions
POST   /api/transactions
GET    /api/transactions/:id
PUT    /api/transactions/:id
DELETE /api/transactions/:id

GET    /api/market/search?q=AAPL
GET    /api/market/indices/:index
GET    /api/market/stocks/:symbol
GET    /api/market/stocks/:symbol/ohlc?period=day
GET    /api/market/stocks/:symbol/news
GET    /api/market/trending
GET    /api/market/top-gainers
GET    /api/market/top-losers

GET    /api/watchlists
POST   /api/watchlists
GET    /api/watchlists/:id
PUT    /api/watchlists/:id
DELETE /api/watchlists/:id
POST   /api/watchlists/:id/symbols
DELETE /api/watchlists/:id/symbols/:symbol
```

## Design System

### Color Palette

**Primary**: #2563EB (Blue)
- Light: #E0F2FE
- Dark: #1E40AF

**Success**: #10B981 (Green)
**Danger**: #EF4444 (Red)
**Warning**: #F59E0B (Orange)

### Dark & Light Modes

- **Dark Mode**: 
  - Background: #0F172A
  - Card: #1E293B
  - Border: #334155
  - Text: #F8FAFC

- **Light Mode**:
  - Background: #FFFFFF
  - Card: #F8FAFC
  - Border: #E2E8F0
  - Text: #0F172A

### Spacing Scale
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

### Border Radius
- sm: 6px
- md: 8px
- base: 12px
- lg: 16px
- xl: 20px

### Typography
- Heading 1: 36px / 600 weight
- Heading 2: 30px / 600 weight
- Heading 3: 24px / 600 weight
- Body: 16px / 400 weight
- Small: 14px / 400 weight

## Responsive Design

- **Desktop**: ≥ 1440px
- **Laptop**: ≥ 1024px
- **Tablet**: ≥ 768px
- **Mobile**: ≥ 375px

## Authentication Flow

1. **Login**:
   - User enters email/password
   - Server returns JWT access token + refresh token
   - Access token stored in sessionStorage
   - Refresh token stored in localStorage (if "Remember me" checked) or sessionStorage

2. **Protected Routes**:
   - AuthGuard checks if access token exists
   - Auth interceptor adds token to all requests

3. **Token Refresh**:
   - Error interceptor catches 401 responses
   - Calls refresh token endpoint
   - Updates access token
   - Retries original request

4. **Logout**:
   - Clears all tokens
   - Navigates to login page

## Development Guidelines

### Component Structure

All components are **standalone** and use:
- Reactive Forms for form handling
- Observable subscriptions with takeUntil pattern
- TypeScript strict mode enabled
- RxJS best practices

### Service Layer

Services provide:
- Observable-based data fetching
- Error handling
- Request/response transformation
- Caching where appropriate

### State Management

Ready for NgRx expansion with:
- Actions for user interactions
- Effects for side effects (HTTP calls)
- Reducers for state updates
- Selectors for derived state

## Performance Optimizations

1. **Lazy Loading**: Feature modules load on demand
2. **OnPush Detection**: Can be enabled for components
3. **Unsubscribe Pattern**: All subscriptions use takeUntil
4. **Tree Shaking**: Unused code removed in production
5. **Minification**: Production builds minified

## Security Considerations

1. **JWT Tokens**:
   - Access token in memory only (not vulnerable to XSS)
   - Refresh token in HttpOnly cookie (not accessible via JavaScript)

2. **HTTP Security**:
   - All requests use HTTPS in production
   - CSRF tokens can be added to interceptor

3. **Input Validation**:
   - Client-side validation using Angular Validators
   - Server-side validation required

4. **Environment Variables**:
   - API URL in environment files
   - Secrets never committed to repo

## Deployment

1. **Build**: `npm run build`
2. **Output**: `dist/stock-portfolio/`
3. **Server**: Can be deployed to any static hosting (Netlify, Vercel, AWS S3, etc.)
4. **Environment**: Update environment.prod.ts before building

## Future Enhancements

1. **NgRx Integration**: Add comprehensive state management
2. **Real-time Data**: WebSocket integration for live quotes
3. **Advanced Charts**: ECharts with technical indicators
4. **Notifications**: Toast/snackbar notifications
5. **Offline Support**: Service Worker caching
6. **Mobile App**: NativeScript or React Native wrapper
7. **Analytics**: User behavior tracking
8. **Testing**: Unit, integration, and E2E tests

## Contributing

- Follow Angular style guide
- Use TypeScript strict mode
- Add unit tests for new features
- Update documentation
- Use conventional commit messages
