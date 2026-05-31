# Portix Application Shell - Quick Reference

## 🎯 What Was Redesigned

### ✅ Complete Application Shell Architecture
- **Sidebar**: Premium dark theme with 260px/72px responsive behavior
- **Header**: Fixed 64px with search, market status, notifications, and user menu
- **Content Area**: Proper spacing with breadcrumbs and page headers
- **Design System**: Complete color palette, spacing, and typography system

---

## 📊 Key Specifications

### Sidebar
```
Expanded:  260px
Collapsed: 72px
Transition: 250ms cubic-bezier(0.4, 0, 0.2, 1)
Background: #0A0E1A
```

### Header
```
Height: 64px
Position: sticky top
Background: #0A0E1A
Search Max-Width: 480px
```

### Content
```
Max-Width: 1600px
Padding: 24px
Background: #050810
```

---

## 🎨 Color System

### Backgrounds
```scss
App:     #050810
Sidebar: #0A0E1A
Card:    #0F1419
Hover:   rgba(148, 163, 184, 0.08)
Active:  rgba(37, 99, 235, 0.12)
```

### Text
```scss
Primary:   #F8FAFC
Secondary: #94A3B8
Tertiary:  #64748B
Muted:     #475569
```

### Accents
```scss
Primary: #3B82F6
Success: #10B981
Danger:  #EF4444
Warning: #F59E0B
```

---

## 📐 Spacing Scale

```scss
xs:  4px   // Tight spacing
sm:  8px   // Related items
md:  12px  // Component padding
lg:  16px  // Section spacing
xl:  24px  // Major sections
2xl: 32px  // Page sections
```

---

## 🎭 Component States

### Navigation Item
```scss
Default: color: #94A3B8
Hover:   background: rgba(148, 163, 184, 0.08)
Active:  background: rgba(37, 99, 235, 0.12) + 3px gradient border
```

### Buttons
```scss
Primary:   gradient(#3B82F6, #2563EB)
Secondary: rgba(148, 163, 184, 0.08)
Padding:   10px 16px
Radius:    8px
```

---

## 📱 Responsive Behavior

### Desktop (>768px)
- Sidebar toggles: 260px ↔ 72px
- Full search bar visible
- Market status visible
- User name visible

### Mobile (≤768px)
- Sidebar: always 72px
- Search bar: 200px max
- Market status: hidden
- User name: hidden

---

## 🏗️ File Structure

```
src/
├── app/
│   ├── layouts/
│   │   ├── main-layout/
│   │   │   └── main-layout.component.ts
│   │   ├── sidebar/
│   │   │   ├── sidebar.component.ts
│   │   │   ├── sidebar.component.html
│   │   │   └── sidebar.component.scss
│   │   └── header/
│   │       ├── header.component.ts
│   │       ├── header.component.html
│   │       └── header.component.scss
│   ├── core/
│   │   └── services/
│   │       └── sidebar.service.ts
│   └── features/
│       └── dashboard/
│           ├── dashboard.component.ts
│           ├── dashboard.component.html
│           └── dashboard.component.scss
└── styles/
    ├── global.scss
    └── tailwind.css
```

---

## 🚀 Usage Examples

### Page Template
```html
<div class="page-container">
  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <span class="breadcrumb-item">Home</span>
    <span class="breadcrumb-separator">/</span>
    <span class="breadcrumb-item active">Page</span>
  </div>

  <!-- Header -->
  <div class="page-header">
    <div class="header-content">
      <h1 class="page-title">Page Title</h1>
      <p class="page-subtitle">Description</p>
    </div>
    <div class="header-actions">
      <button class="btn-secondary">Action</button>
      <button class="btn-primary">Primary</button>
    </div>
  </div>

  <!-- Content -->
  <div class="dashboard-content">
    <!-- Your content -->
  </div>
</div>
```

### Adding Navigation
```typescript
// sidebar.component.ts
navItems: NavItem[] = [
  { label: 'Dashboard', icon: '📊', route: '/dashboard' },
  { label: 'Portfolio', icon: '💼', route: '/portfolio' },
  { label: 'Analytics', icon: '📈', route: '/analytics' },
];
```

---

## 🎯 Design Principles Applied

1. **Dark-First**: Professional fintech aesthetic
2. **Minimal Spacing**: Efficient screen usage (24px padding)
3. **Smooth Animations**: 250ms transitions
4. **Visual Hierarchy**: Clear information structure
5. **Responsive**: Auto-adapting layouts

---

## ✨ Key Features

### Sidebar
- ✅ Grouped navigation sections
- ✅ Active state with gradient indicator
- ✅ Smooth collapse/expand animation
- ✅ User profile section
- ✅ Tooltip on collapsed items

### Header
- ✅ Global search with icon
- ✅ Market status indicator (animated pulse)
- ✅ Notification dropdown with badge
- ✅ User menu dropdown
- ✅ Theme toggle button
- ✅ Sticky positioning

### Content
- ✅ Breadcrumb navigation
- ✅ Page header with actions
- ✅ Responsive container (max 1600px)
- ✅ Proper spacing system
- ✅ Auto-expanding on sidebar collapse

---

## 🎨 Tailwind Utilities

### Layout
```html
<div class="flex items-center justify-between gap-6">
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
<div class="max-w-[1600px] mx-auto px-6">
```

### Colors
```html
<div class="bg-[#0A0E1A] text-slate-100">
<div class="border-slate-800/10">
```

### Effects
```html
<div class="transition-all duration-150">
<div class="backdrop-blur-sm">
<div class="shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
```

---

## 📚 Documentation

- **Full Design System**: See `DESIGN_SYSTEM.md`
- **Component Specs**: Detailed in design system doc
- **Color Palette**: Complete token reference
- **Spacing System**: Premium fintech scale
- **Typography**: Inter font with proper letter-spacing

---

## 🎯 Comparison to Design Inspirations

### Stripe Dashboard
- ✅ Clean spacing
- ✅ Professional buttons
- ✅ Subtle borders

### TradingView
- ✅ Dark theme
- ✅ Efficient layouts
- ✅ Market indicators

### Linear
- ✅ Typography scale
- ✅ Smooth animations
- ✅ Modern aesthetic

### Vercel Dashboard
- ✅ Minimal design
- ✅ Subtle effects
- ✅ Premium feel

---

## ⚡ Performance

- GPU-accelerated transforms
- Optimized transitions (250ms)
- Minimal shadow usage
- Efficient color system
- Smooth scrolling

---

## 🔧 Customization

### Change Sidebar Width
```scss
// sidebar.component.scss
$sidebar-width: 260px;
$sidebar-collapsed-width: 72px;
```

### Change Colors
```scss
// global.scss
:root {
  --color-primary: #3B82F6;
  --color-bg-app: #050810;
}
```

### Change Spacing
```scss
// global.scss
:root {
  --space-xl: 24px;
}
```

---

**Status**: ✅ Production Ready  
**Theme**: Dark (Premium Fintech)  
**Framework**: Angular + Tailwind  
**Design**: Stripe + TradingView + Linear + Vercel
