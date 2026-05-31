# Component Library - Quick Reference

## Core Components

### Layout Components

#### **MainLayoutComponent** (`src/app/layouts/main-layout/`)
Main application wrapper combining sidebar and header.

```typescript
// Usage in routes
{
  path: '',
  component: MainLayoutComponent,
  canActivate: [AuthGuard],
  children: [...]
}
```

#### **SidebarComponent** (`src/app/layouts/sidebar/`)
Left navigation sidebar with collapsible menu.

**Features**:
- Navigation menu with icons
- User profile section
- Logout button
- Responsive collapse on mobile
- Active route highlighting

```html
<!-- Navigation items -->
- Dashboard
- Portfolio
- Transactions
- Market
- Watchlist
- Analytics
- Reports
```

#### **HeaderComponent** (`src/app/layouts/header/`)
Top header with search, notifications, theme toggle, and user menu.

**Features**:
- Stock search bar
- Theme switcher (dark/light mode)
- Notification dropdown (3 recent notifications)
- User profile dropdown
- Responsive design

## Authentication Components

### **LoginComponent** (`src/app/features/auth/login/`)
User login page with email/password authentication.

**Features**:
- Email & password validation
- Remember me checkbox
- Forgot password link
- Social login buttons (placeholder)
- Error message display
- Loading spinner

**Form Fields**:
- Email (required, valid email format)
- Password (required, min 6 characters)
- Remember Me (optional)

### **RegisterComponent** (`src/app/features/auth/register/`)
User registration page for new accounts.

**Features**:
- Form validation
- Password matching validation
- Error handling
- Existing account login link
- Loading state

**Form Fields**:
- Full Name (required, min 2 characters)
- Email (required, valid email format)
- Password (required, min 6 characters)
- Confirm Password (must match password)

## Dashboard Components

### **DashboardComponent** (`src/app/features/dashboard/`)
Main dashboard showing portfolio overview and metrics.

**Sections**:

1. **Metrics Cards**
   - Total Portfolio Value
   - Total Profit/Loss
   - Total Invested Capital
   - Cash Balance

2. **Charts**
   - Portfolio Growth (Line Chart)
   - Asset Allocation (Pie Chart)

3. **Tables**
   - Top Gainers (5 stocks)
   - Top Losers (5 stocks)
   - Recent Transactions (10 items)

**Features**:
- Real-time metric calculation
- Color-coded profit/loss
- Interactive table sorting
- Pagination ready

## Portfolio Components

### **PortfolioListComponent** (`src/app/features/portfolio/portfolio-list/`)
Displays all user portfolios in a grid/card layout.

**Features**:
- Portfolio cards with metrics
- Create new portfolio button
- Edit and delete actions
- Holdings count display
- Responsive grid layout

**Card Contents**:
- Portfolio name
- Total value
- Profit/loss
- ROI percentage
- Number of holdings

### **PortfolioDetailComponent** (`src/app/features/portfolio/portfolio-detail/`)
Detailed view of a single portfolio.

**Planned Features**:
- Portfolio summary metrics
- Holdings table with details
- Portfolio growth chart
- Asset allocation chart
- Sector allocation chart
- Add/edit holdings
- Transaction history

## Feature Components

### **TransactionsListComponent** (`src/app/features/transactions/transactions-list/`)
Complete transaction history with filtering and pagination.

**Features**:
- Paginated transactions table
- Filter by type (Buy, Sell, Dividend, Stock Split)
- Sort by date, symbol, or amount
- Transaction details
- Export functionality (planned)

**Columns**:
- Date
- Symbol
- Transaction Type
- Quantity
- Price
- Total Value

### **MarketComponent** (`src/app/features/market/`)
Market data and stock search interface.

**Planned Features**:
- Stock search with autocomplete
- Market indices (VN30, VN100, HNX30, UPCOM)
- Top gainers/losers
- Stock detail page with OHLC chart
- Technical indicators (SMA, EMA, RSI, MACD)

### **WatchlistComponent** (`src/app/features/watchlist/`)
User watchlist management.

**Planned Features**:
- Create/edit watchlists
- Add/remove stocks
- Watchlist stocks table
- Quick price alerts

### **AnalyticsComponent** (`src/app/features/analytics/`)
Advanced portfolio analytics and insights.

**Planned Features**:
- Portfolio growth trend
- Profit distribution
- Sector allocation
- Monthly return analysis
- Benchmark comparison

### **ReportsComponent** (`src/app/features/reports/`)
Report generation and export.

**Planned Features**:
- Report period selection (Daily, Weekly, Monthly, Yearly)
- Report preview
- Export to PDF/Excel
- Email report delivery

### **ProfileComponent** (`src/app/features/profile/`)
User profile and account information.

**Display Sections**:
- Avatar
- Full name
- Email address
- Phone number (if provided)
- Member since date
- Edit profile (planned)

### **SettingsComponent** (`src/app/features/settings/`)
User account preferences and security settings.

**Planned Sections**:
- Personal information
- Security & password
- Notification preferences
- Theme preferences
- Privacy settings

## Shared Components

### **LoadingSpinnerComponent** (`src/app/shared/components/loading-spinner/`)
Reusable loading indicator.

**Usage**:
```html
<!-- Default size (md) -->
<app-loading-spinner></app-loading-spinner>

<!-- Small size -->
<app-loading-spinner size="sm"></app-loading-spinner>

<!-- Large size -->
<app-loading-spinner size="lg"></app-loading-spinner>
```

**Props**:
- `size: 'sm' | 'md' | 'lg'` (default: 'md')

## Services Reference

### **AuthService**
Handles authentication and user session.

```typescript
// Login
authService.login(request).subscribe(response => {
  // User logged in
});

// Register
authService.register(request).subscribe(response => {
  // User registered
});

// Get current user
const user = authService.getCurrentUser();

// Check authentication
const isAuth = authService.isAuthenticated();

// Get access token
const token = authService.getAccessToken();

// Logout
authService.logout();
```

### **PortfolioService**
CRUD operations for portfolios and holdings.

```typescript
// Get all portfolios
portfolioService.getPortfolios().subscribe(portfolios => {});

// Get specific portfolio
portfolioService.getPortfolioById(id).subscribe(portfolio => {});

// Create portfolio
portfolioService.createPortfolio(name, description).subscribe(portfolio => {});

// Update portfolio
portfolioService.updatePortfolio(id, name, description).subscribe(portfolio => {});

// Delete portfolio
portfolioService.deletePortfolio(id).subscribe(response => {});

// Get holdings
portfolioService.getHoldings(portfolioId).subscribe(holdings => {});

// Add holding
portfolioService.addHolding(portfolioId, holding).subscribe(holding => {});
```

### **MarketService**
Market data and stock information.

```typescript
// Search stocks
marketService.searchStocks(query).subscribe(stocks => {});

// Get stocks by index
marketService.getStocksByMarketIndex('VN30').subscribe(stocks => {});

// Get stock detail
marketService.getStockDetail(symbol).subscribe(stock => {});

// Get OHLC data
marketService.getOHLCData(symbol, 'day').subscribe(data => {});

// Get stock news
marketService.getStockNews(symbol, limit).subscribe(news => {});

// Get benchmark comparison
marketService.getBenchmarkComparison(portfolioReturn).subscribe(comparison => {});
```

### **TransactionService**
Transaction management and history.

```typescript
// Get transactions
transactionService.getTransactions().subscribe(data => {});

// Get transaction by ID
transactionService.getTransactionById(id).subscribe(transaction => {});

// Create transaction
transactionService.createTransaction(transaction).subscribe(tx => {});

// Update transaction
transactionService.updateTransaction(id, transaction).subscribe(tx => {});

// Delete transaction
transactionService.deleteTransaction(id).subscribe(response => {});

// Get recent transactions
transactionService.getRecentTransactions(limit).subscribe(transactions => {});
```

### **WatchlistService**
Watchlist management.

```typescript
// Get watchlists
watchlistService.getWatchlists().subscribe(watchlists => {});

// Create watchlist
watchlistService.createWatchlist(name).subscribe(watchlist => {});

// Add symbol
watchlistService.addSymbol(watchlistId, symbol).subscribe(watchlist => {});

// Remove symbol
watchlistService.removeSymbol(watchlistId, symbol).subscribe(watchlist => {});

// Get watchlist stocks
watchlistService.getWatchlistStocks(watchlistId).subscribe(stocks => {});
```

## Model Interfaces

### **User**
```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  avatar?: string;
  createdAt: Date;
}
```

### **Portfolio**
```typescript
interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  holdings: Holding[];
  totalCost: number;
  currentValue: number;
  unrealizedProfit: number;
  realizedProfit: number;
  roi: number;
}
```

### **Stock**
```typescript
interface Stock {
  symbol: string;
  companyName: string;
  industry?: string;
  currentPrice: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  marketCap?: number;
  changePercent: number;
  lastUpdate: Date;
}
```

### **Transaction**
```typescript
interface Transaction {
  id: string;
  portfolioId: string;
  symbol: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'STOCK_SPLIT';
  date: Date;
  quantity: number;
  price: number;
  fee?: number;
  totalValue: number;
  notes?: string;
}
```

## Styling Classes

### Typography
```html
<h1>Heading 1 (36px, Bold)</h1>
<h2>Heading 2 (30px, Bold)</h2>
<h3>Heading 3 (24px, Bold)</h3>
<p>Body text (16px)</p>
<small>Small text (14px)</small>
```

### Colors
```html
<!-- Text Colors -->
<p class="text-primary">Primary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
<p class="text-warning">Warning text</p>

<!-- Background Colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-success-light">Light success background</div>
<div class="bg-danger-light">Light danger background</div>
```

### Cards and Containers
```html
<!-- Card -->
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    Content here
  </div>
</div>

<!-- Grid -->
<div class="grid-responsive">
  <!-- Auto-responsive grid: 1 col mobile, 2 tablet, 3 laptop, 4 desktop -->
</div>
```

## Common Patterns

### Form Handling
```typescript
export class MyComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(): void {
    if (this.form.valid) {
      // Submit logic
    }
  }
}
```

### Data Loading
```typescript
export class MyComponent implements OnInit, OnDestroy {
  data$ = this.service.getData();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.data$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        // Handle data
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Route Navigation
```typescript
// Navigate to route
this.router.navigate(['/portfolio', portfolioId]);

// Navigate with query params
this.router.navigate(['/dashboard'], { queryParams: { tab: 'overview' } });

// Go back
this.location.back();
```

## Responsive Breakpoints

```scss
// Mobile first approach
@media (min-width: 768px) {
  // Tablet and up
}

@media (min-width: 1024px) {
  // Laptop and up
}

@media (min-width: 1440px) {
  // Desktop and up
}
```

## Best Practices

1. **Always unsubscribe** from observables to prevent memory leaks
2. **Use standalone components** for new features
3. **Keep components small** and focused on single responsibility
4. **Use services** for shared logic across components
5. **Follow TypeScript strict mode** for type safety
6. **Use path aliases** for cleaner imports
7. **Add proper error handling** in API calls
8. **Use reactive forms** for complex form handling
9. **Implement responsive design** for all screen sizes
10. **Test all components** with unit and integration tests
