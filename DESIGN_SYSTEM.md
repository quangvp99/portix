# Portix Design System - Application Shell Architecture

## Overview
Premium fintech dashboard layout inspired by **Stripe**, **TradingView**, **Linear**, and **Vercel**.

---

## 🎨 Design Principles

1. **Dark-First Design** - Professional fintech aesthetic
2. **Minimal Spacing** - Efficient use of screen real estate
3. **Smooth Animations** - 250ms cubic-bezier transitions
4. **Responsive Grid** - Auto-fit layouts that adapt
5. **Visual Hierarchy** - Clear information architecture

---

## 📐 Layout Architecture

### Application Shell Structure

```
┌─────────────────────────────────────────────────────┐
│  Sidebar (260px / 72px)  │  Main Content Area       │
│  ┌──────────────────┐    │  ┌────────────────────┐  │
│  │ Logo + Toggle    │    │  │ Header (64px)      │  │
│  ├──────────────────┤    │  ├────────────────────┤  │
│  │                  │    │  │                    │  │
│  │ Navigation       │    │  │ Breadcrumb         │  │
│  │ Sections         │    │  │ Page Header        │  │
│  │                  │    │  │ Content Area       │  │
│  │                  │    │  │                    │  │
│  ├──────────────────┤    │  │                    │  │
│  │ User Profile     │    │  │                    │  │
│  └──────────────────┘    │  └────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Component Specifications

### 1. Sidebar

**Dimensions:**
- Expanded: `260px`
- Collapsed: `72px`
- Transition: `250ms cubic-bezier(0.4, 0, 0.2, 1)`

**Colors:**
- Background: `#0A0E1A`
- Border: `rgba(148, 163, 184, 0.12)`
- Text: `#94A3B8`
- Text Active: `#F8FAFC`
- Hover Background: `rgba(148, 163, 184, 0.08)`
- Active Background: `rgba(37, 99, 235, 0.12)`

**Sections:**
1. **Logo Section** (64px height)
   - Logo icon with gradient background
   - Brand name (hidden when collapsed)
   - Toggle button

2. **Navigation Menu**
   - Grouped sections with labels
   - Icons (20px)
   - Labels (14px, -0.01em letter-spacing)
   - Active indicator (3px gradient bar)
   - Badges for notifications

3. **User Section**
   - Avatar (32px, rounded 8px)
   - User info (name + email)
   - Action buttons (Settings, Logout)

**Navigation Item States:**
```scss
Default:  color: #94A3B8, opacity: 0.8
Hover:    background: rgba(148, 163, 184, 0.08), color: #F8FAFC
Active:   background: rgba(37, 99, 235, 0.12), left-border: 3px gradient
```

---

### 2. Header

**Dimensions:**
- Height: `64px`
- Padding: `0 24px`
- Position: `sticky top`
- Z-index: `50`

**Colors:**
- Background: `#0A0E1A`
- Border: `rgba(148, 163, 184, 0.12)`
- Backdrop Filter: `blur(8px)`

**Components:**

1. **Search Bar** (max-width: 480px)
   - Icon position: absolute left
   - Input padding: `10px 16px 10px 40px`
   - Border radius: `8px`
   - Focus: blue glow with 3px shadow

2. **Market Status Indicator**
   - Dot: 6px, animated pulse
   - Text: 12px, 500 weight
   - Background: `rgba(16, 185, 129, 0.12)`
   - Color: `#10B981`

3. **Action Buttons**
   - Size: `36px × 36px`
   - Icon: `18px`
   - Border radius: `6px`
   - Hover: `rgba(148, 163, 184, 0.08)`

4. **User Menu**
   - Avatar: 32px, rounded 8px, gradient
   - Name: 13px, 500 weight
   - Chevron: 10px

**Dropdown Menu:**
- Background: `#0F1419`
- Border: `rgba(148, 163, 184, 0.12)`
- Shadow: `0 10px 40px rgba(0, 0, 0, 0.4)`
- Border radius: `8px`
- Animation: slideDown 200ms

---

### 3. Main Content Area

**Layout:**
- Margin-left: `260px` (expanded) / `72px` (collapsed)
- Transition: `250ms cubic-bezier(0.4, 0, 0.2, 1)`
- Background: `#050810`

**Content Container:**
- Max-width: `1600px`
- Padding: `24px`
- Margin: `0 auto`

---

### 4. Page Structure

**Breadcrumb:**
- Font size: `13px`
- Color: `#64748B`
- Active: `#F8FAFC`, 500 weight
- Separator: `/` in `#475569`
- Margin bottom: `16px`

**Page Header:**
- Display: flex, space-between
- Margin bottom: `32px`
- Gap: `24px`

**Page Title:**
- Font size: `28px`
- Weight: `600`
- Color: `#F8FAFC`
- Letter spacing: `-0.02em`
- Margin bottom: `8px`

**Page Subtitle:**
- Font size: `14px`
- Color: `#94A3B8`
- Letter spacing: `-0.01em`

---

## 🎨 Spacing System

```scss
// Premium Fintech Spacing
--space-xs:   4px    // Tight elements
--space-sm:   8px    // Related items
--space-md:   12px   // Component padding
--space-lg:   16px   // Section spacing
--space-xl:   24px   // Major sections
--space-2xl:  32px   // Page sections
```

**Usage:**
- Card padding: `16px - 20px`
- Grid gaps: `12px - 16px`
- Section margins: `24px - 32px`
- Page padding: `24px`

---

## 🎭 Color Palette

### Dark Theme (Primary)

**Backgrounds:**
```scss
--bg-app:       #050810   // App background
--bg-sidebar:   #0A0E1A   // Sidebar/Header
--bg-card:      #0F1419   // Cards/Dropdowns
--bg-hover:     rgba(148, 163, 184, 0.08)
--bg-active:    rgba(37, 99, 235, 0.12)
```

**Borders:**
```scss
--border-subtle:  rgba(148, 163, 184, 0.08)
--border-default: rgba(148, 163, 184, 0.12)
--border-strong:  rgba(148, 163, 184, 0.2)
```

**Text:**
```scss
--text-primary:   #F8FAFC
--text-secondary: #94A3B8
--text-tertiary:  #64748B
--text-muted:     #475569
```

**Accent Colors:**
```scss
--primary:   #3B82F6
--success:   #10B981
--danger:    #EF4444
--warning:   #F59E0B
```

---

## 🎬 Animations

### Transitions
```scss
// Standard transition
transition: all 0.15s ease;

// Layout transitions
transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);

// Hover effects
transition: all 0.15s ease;
```

### Keyframes
```scss
// Dropdown slide
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

// Pulse animation
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🔘 Button System

### Primary Button
```scss
background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
color: white;
padding: 10px 16px;
border-radius: 8px;
font-size: 14px;
font-weight: 500;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

&:hover {
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}
```

### Secondary Button
```scss
background-color: rgba(148, 163, 184, 0.08);
color: #94A3B8;
border: 1px solid rgba(148, 163, 184, 0.12);
padding: 10px 16px;
border-radius: 8px;

&:hover {
  background-color: rgba(148, 163, 184, 0.12);
  color: #F8FAFC;
}
```

---

## 📱 Responsive Breakpoints

```scss
// Desktop First Approach
@media (max-width: 1440px) { /* Large Desktop */ }
@media (max-width: 1024px) { /* Tablet Landscape */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 640px)  { /* Mobile */ }
```

**Sidebar Behavior:**
- Desktop (>768px): Toggle between 260px / 72px
- Mobile (≤768px): Always 72px (collapsed)

---

## 🎯 Typography

### Font Family
```scss
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Scale
```scss
// Headings
h1: 28px, 600 weight, -0.02em
h2: 24px, 600 weight, -0.02em
h3: 20px, 600 weight, -0.01em
h4: 18px, 600 weight, -0.01em

// Body
body:     14px, 400 weight, -0.01em
small:    13px, 400 weight
caption:  12px, 400 weight
tiny:     11px, 500 weight, 0.08em (uppercase)
```

---

## 🎨 Tailwind Utility Recommendations

### Layout
```html
<!-- Container -->
<div class="max-w-[1600px] mx-auto px-6">

<!-- Flex Layout -->
<div class="flex items-center justify-between gap-6">

<!-- Grid -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
```

### Spacing
```html
<!-- Padding -->
p-3  (12px)
p-4  (16px)
p-6  (24px)

<!-- Margin -->
mb-4  (16px)
mb-6  (24px)
mb-8  (32px)
```

### Colors
```html
<!-- Background -->
bg-[#0A0E1A]
bg-[#0F1419]

<!-- Text -->
text-slate-100  (#F8FAFC)
text-slate-400  (#94A3B8)
text-slate-500  (#64748B)

<!-- Border -->
border-slate-800/10
```

### Effects
```html
<!-- Transitions -->
transition-all duration-150 ease-in-out
transition-[margin-left] duration-250

<!-- Shadows -->
shadow-sm
shadow-[0_10px_40px_rgba(0,0,0,0.4)]

<!-- Backdrop -->
backdrop-blur-sm
```

---

## 🏗️ Angular Component Structure

### Recommended File Organization

```
src/app/
├── layouts/
│   ├── main-layout/
│   │   └── main-layout.component.ts
│   ├── sidebar/
│   │   ├── sidebar.component.ts
│   │   ├── sidebar.component.html
│   │   └── sidebar.component.scss
│   └── header/
│       ├── header.component.ts
│       ├── header.component.html
│       └── header.component.scss
├── core/
│   └── services/
│       └── sidebar.service.ts
└── features/
    └── dashboard/
        ├── dashboard.component.ts
        ├── dashboard.component.html
        └── dashboard.component.scss
```

---

## ✅ Implementation Checklist

### Sidebar
- [x] 260px expanded / 72px collapsed
- [x] Dark theme (#0A0E1A)
- [x] Grouped navigation sections
- [x] Active indicator (3px gradient)
- [x] Smooth 250ms transitions
- [x] User profile section
- [x] Collapsible with service

### Header
- [x] Fixed 64px height
- [x] Global search (480px max)
- [x] Market status indicator
- [x] Notifications dropdown
- [x] User profile dropdown
- [x] Sticky positioning

### Content Area
- [x] Responsive margin (260px/72px)
- [x] Max-width 1600px container
- [x] 24px padding
- [x] Breadcrumb navigation
- [x] Page header with actions
- [x] Smooth transitions

### Design System
- [x] Premium spacing system
- [x] Dark color palette
- [x] Typography scale
- [x] Button components
- [x] Animation system
- [x] Responsive breakpoints

---

## 🚀 Usage Examples

### Creating a New Page

```typescript
// page.component.html
<div class="page-container">
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <span class="breadcrumb-item">Home</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item active">Page Name</span>
  </div>

  <!-- Page Header -->
  <div class="page-header">
    <div class="header-content">
      <h1 class="page-title">Page Title</h1>
      <p class="page-subtitle">Page description</p>
    </div>
    <div class="header-actions">
      <button class="btn-secondary">Secondary</button>
      <button class="btn-primary">Primary Action</button>
    </div>
  </div>

  <!-- Content -->
  <div class="dashboard-content">
    <!-- Your content here -->
  </div>
</div>
```

### Adding Navigation Items

```typescript
// sidebar.component.ts
navItems: NavItem[] = [
  { label: 'Dashboard', icon: '📊', route: '/dashboard' },
  { label: 'Portfolio', icon: '💼', route: '/portfolio' },
  { label: 'Transactions', icon: '💳', route: '/transactions', badge: 3 },
  { label: 'Analytics', icon: '📈', route: '/analytics' },
  { label: 'Settings', icon: '⚙️', route: '/settings' },
];
```

---

## 🎯 Best Practices

1. **Spacing**: Use 12px, 16px, 24px, 32px increments
2. **Colors**: Stick to the defined palette
3. **Typography**: Use letter-spacing for better readability
4. **Animations**: Keep under 300ms for snappy feel
5. **Borders**: Use rgba with low opacity for subtle dividers
6. **Shadows**: Minimal and purposeful
7. **Gradients**: Use for primary actions and accents
8. **Icons**: 16-20px for UI, consistent sizing

---

## 📊 Performance Considerations

- Use `transform` for animations (GPU accelerated)
- Implement `will-change` for frequently animated elements
- Use `backdrop-filter` sparingly
- Optimize SVG icons
- Lazy load heavy components
- Use CSS containment where applicable

---

## 🎨 Design Inspiration Sources

- **Stripe Dashboard**: Clean spacing, professional buttons
- **TradingView**: Dark theme, efficient layouts
- **Linear**: Typography, smooth animations
- **Vercel Dashboard**: Modern aesthetic, subtle effects

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Design System**: Portix Premium Fintech
