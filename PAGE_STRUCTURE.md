# Insurance Page - Visual Structure

## Page Layout Flow

```
┌─────────────────────────────────────────────────┐
│         PAGE BANNER (Hero Section)              │
│  Title: "Insurance & TPA Partners"              │
│  Subtitle: "Trusted healthcare coverage..."     │
│  Background: Medical/healthcare image           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│    GOVERNMENT PANELS SECTION                    │
│    ┌────────────────────────────────────────┐   │
│    │ Badge: "Government Coverage"           │   │
│    │ Title: "Government Panels"             │   │
│    │ Subtitle: "Comprehensive coverage..." │   │
│    └────────────────────────────────────────┘   │
│                                                 │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│    │  ECHS    │  │   ESI    │  │ Haryana  │   │
│    │ [Logo]   │  │ [Logo]   │  │ [Logo]   │   │
│    │ Card 1   │  │ Card 2   │  │ Card 3   │   │
│    └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│    TPA PARTNERS SECTION                         │
│    ┌────────────────────────────────────────┐   │
│    │ Badge: "Partner Network"               │   │
│    │ Title: "TPA Partners"                  │   │
│    │ Subtitle: "Seamless coordination..."  │   │
│    └────────────────────────────────────────┘   │
│                                                 │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │
│   │ TPA 1  │ │ TPA 2  │ │ TPA 3  │ │ TPA 4  │ │
│   │ [Logo] │ │ [Logo] │ │ [Logo] │ │ [Logo] │ │
│   │ Card   │ │ Card   │ │ Card   │ │ Card   │ │
│   └────────┘ └────────┘ └────────┘ └────────┘ │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│    PRIVATE INSURANCE SECTION                    │
│    ┌────────────────────────────────────────┐   │
│    │ Badge: "Premium Coverage"              │   │
│    │ Title: "Private Insurance"             │   │
│    │ Subtitle: "Major insurance companies.."│   │
│    └────────────────────────────────────────┘   │
│                                                 │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│    │Apollo    │  │Aditya    │  │Star      │   │
│    │Insurance │  │Birla     │  │Health    │   │
│    │ [Logo]   │  │ [Logo]   │  │ [Logo]   │   │
│    └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│    CASHLESS FACILITIES SECTION                  │
│    ┌────────────────────────────────────────┐   │
│    │ Badge: "Convenience"                   │   │
│    │ Title: "Cashless Facilities"           │   │
│    │ Subtitle: "Hassle-free experience..."  │   │
│    └────────────────────────────────────────┘   │
│                                                 │
│  ✓ Zero Down Payment    ✓ Direct Bill         │
│  ✓ Instant Auth         ✓ Pre-Admission       │
│  ✓ Emergency Coverage   ✓ 24/7 Support        │
│  ✓ Online Claim Status  ✓ Easy Documents      │
│                                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│    SUPPORT SECTION (CTA)                        │
│    ┌────────────────────────────────────────┐   │
│    │ 🛡️  Need Insurance Assistance?         │   │
│    │                                        │   │
│    │ Our dedicated team is ready to assist │   │
│    │ with all insurance and mediclaim      │   │
│    │ procedures...                         │   │
│    │                                        │   │
│    │  [Call for Support]  [Email Team]     │   │
│    └────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

---

## Card Design - Glassmorphism Style

### Government Panel / Private Insurance Card:
```
┌────────────────────────────────────┐
│  Logo Container (h-40)             │
│  ┌──────────────────────────────┐  │
│  │  [PARTNER LOGO/IMAGE]        │  │
│  │  object-fit: contain         │  │
│  │  centered                    │  │
│  └──────────────────────────────┘  │
├────────────────────────────────────┤
│  Partner Name                   ✓  │
│  (Title - bold, large)         Active │
│                                     │
│  Description text...               │
│  Brief overview of the partner      │
│                                     │
│  ✓ Benefit 1 (if available)        │
│  ✓ Benefit 2 (if available)        │
└────────────────────────────────────┘

Colors:
- Background: from-white/80 to-white/40
- Border: border-white/20
- Hover: boxShadow enhancement
- Logo area: from-primary-50 to-cyan-50
```

### TPA Partner Card (Compact):
```
┌────────────────────────────────┐
│  Logo Container (h-32)         │
│  ┌──────────────────────────┐  │
│  │  [TPA LOGO/IMAGE]        │  │
│  └──────────────────────────┘  │
│                                │
│  TPA Partner Name              │
│  (Centered, bold)              │
│                                │
│  [TPA Partner] Badge           │
│  (Centered, small)             │
│                                │
│  Description (if available)    │
│  Centered text                 │
│                                │
│     ✓ Active                   │
│                                │
└────────────────────────────────┘

Layout: Centered, 4-column on desktop
More compact for visual balance
```

---

## Responsive Breakpoints

### Mobile (< 640px)
- Grid: 1 column
- Padding: px-3 (12px)
- Text: Small (sm)
- Cards: Full width
- Logo height: h-24 (96px)

### Tablet (640px - 1024px)
- Grid: 2 columns
- Padding: px-4 (16px)
- Text: Base
- Cards: Half width minus gap
- Logo height: h-32 (128px)

### Desktop (> 1024px)
- Government/Private: 3 columns
- TPA Partners: 4 columns
- Padding: px-6 to px-8 (24-32px)
- Text: Large (lg)
- Cards: Optimal width
- Logo height: h-32 to h-40

---

## Color Scheme

```
Primary Colors:
- Primary-600: #2563eb (Main brand blue)
- Primary-700: #1d4ed8 (Darker for hover/shadow)
- Cyan-50: #ecf9ff (Light background)

Medical Theme:
- Medical-green: #10b981 (Health/active indicator)
- Accent: Brand accent color (for badges)
- Slate: Gray tones for text

Backgrounds:
- White for main sections
- Gradient-soft or slate-50 for alternating sections
- Glassmorphism: Semi-transparent white with backdrop blur
```

---

## Responsive Grid Examples

### Government Panels:
```
Mobile:    1 col (full width)
Tablet:    2 cols (2 cards per row)
Desktop:   3 cols (3 cards per row)

Gap:       gap-4 sm:gap-6 (16px → 24px)
```

### TPA Partners:
```
Mobile:    1 col (stacked)
Tablet:    2 cols (compact layout)
Desktop:   4 cols (wide display)

Gap:       gap-4 sm:gap-6
```

### Cashless Facilities:
```
Mobile:    1 col
Tablet:    2 cols (2 items per row)
Desktop:   4 cols (long list)

Gap:       gap-3 sm:gap-4 (tight spacing)
```

---

## Interactive Elements

### Card Hover Effect:
```
Before:    Normal shadow, normal position
Hover:     -translateY-1.5 (6px up)
           boxShadow: larger/more prominent
           Gradient overlay appears
           Smooth transition (300ms)
```

### Badge Styling:
```
Active: Green background + green text + icon
        rounded-full (pill shape)
        px-3 py-1.5 (small padding)
        border-medical-green/20

Category: Accent color
          rounded-full
          px-3 py-1
```

### Buttons:
```
CTA Buttons:
- Primary: White bg, primary text, hover bg-slate-100
- Secondary: White border, white text, hover bg-white/10
- Padding: px-6 sm:px-8 py-3 sm:py-4
- Rounded: rounded-xl
```

---

## Loading & Empty States

### Loading:
```
Skeleton loaders:
- Height: matches content height
- Background: bg-slate-200
- Animation: animate-pulse
```

### Empty Section:
```
┌────────────────────────────────┐
│                                │
│          [Icon]                │
│        (Large, light)          │
│                                │
│  No government panels added    │
│  (Small, muted text)           │
│                                │
└────────────────────────────────┘
```

### Error State:
```
┌──────────────────────────────────┐
│ ⚠️  Error loading partners       │
│ Failed to fetch data from server │
└──────────────────────────────────┘
(Yellow banner, top of page)
```

---

## Animation Details

### Staggered Container:
```javascript
containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // 100ms between items
      delayChildren: 0.1,        // 100ms initial delay
    },
  },
}
```

### Item Animation:
```javascript
itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },  // 500ms ease-in-out
  },
}
```

### Hover Animation:
```javascript
whileHover={{
  translateY: -6,  // Move up 6px
  boxShadow: '0 20px 40px rgba(29, 78, 216, 0.15)'  // Enhanced shadow
}}
```

