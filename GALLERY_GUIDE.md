# Gallery Modal - User Guide & Developer Reference

## User Guide

### How to Navigate the Gallery

#### Desktop
1. **Click Thumbnails**: Click any image in the grid to open modal
2. **Arrow Buttons**: Click ← or → buttons to navigate
3. **Keyboard**: 
   - Press **→** for next image
   - Press **←** for previous image
   - Press **Esc** to close
4. **Click Outside**: Click the dark background to close
5. **Thumbnail Strip**: Click any thumbnail at bottom to jump to that image

#### Mobile / Touch
1. **Tap Thumbnails**: Tap any image to open modal
2. **Swipe**: 
   - Swipe **left** for next image
   - Swipe **right** for previous image
3. **Buttons**: Tap ← or → buttons (larger for touch)
4. **Escape**: Tap X button or tap background
5. **Thumbnails**: Tap to jump to image, scroll horizontally

### Features

✅ **Looping**: Last image → next → First image
✅ **Smooth Animations**: Fade transitions on image change
✅ **Image Info**: Title, category, and counter (X of Y)
✅ **Responsive**: Works on all screen sizes
✅ **Mobile-Friendly**: Touch optimized, swipe support
✅ **Accessibility**: Keyboard navigation, ARIA labels

---

## Developer Reference

### State Variables

```javascript
// Currently selected image index (-1 = no modal)
const [selectedIndex, setSelectedIndex] = useState(-1)

// Touch tracking for swipe detection
const [touchStart, setTouchStart] = useState(0)
const [touchEnd, setTouchEnd] = useState(0)

// Refs for DOM manipulation
const thumbnailScrollRef = useRef(null)  // Thumbnail container
const modalRef = useRef(null)            // Modal div (for focus)
```

### Key Functions

#### Navigation
```javascript
handlePrev()        // Go to previous image (or last if at start)
handleNext()        // Go to next image (or first if at end)
handleThumbnailClick(index)  // Jump to specific image
```

#### Touch
```javascript
handleTouchStart(e)  // Record initial touch position
handleTouchEnd(e)    // Record final touch position
handleSwipe(start, end)  // Determine swipe direction & navigate
```

#### Keyboard
```javascript
// Handled in useEffect - auto-attached/removed with modal
// Arrow Right/Left for navigation
// Escape to close
```

#### Scroll Management
```javascript
// Modal scrolls thumbnail strip to show active image
// Uses scrollIntoView with smooth behavior
```

### Component Structure

```
<Gallery>
  ├── Grid (thumbnails)
  │   └── Image button (each)
  │       └── ResponsiveImage
  └── Modal (AnimatePresence)
      ├── Close Button (X)
      ├── Image Container (with touch events)
      │   ├── Prev Button (←)
      │   ├── Main Image
      │   └── Next Button (→)
      ├── Info Panel
      │   ├── Title
      │   ├── Category
      │   └── Counter
      └── Thumbnail Strip
          └── Thumbnail buttons (each)
              └── ResponsiveImage
```

### Data Flow

```
User Action
    ↓
Handler Function (onClick, onKeyDown, onTouch)
    ↓
setSelectedIndex(newIndex)
    ↓
Component Re-render with new index
    ↓
Modal shows different image
```

### Safe Index Management

```javascript
// Bounds checking prevents out-of-range errors
Math.max(-1, Math.min(newIndex, images.length - 1))

// At start
if (prev === 0) → images.length - 1  // Go to last

// At end
if (prev === images.length - 1) → 0   // Go to first

// Otherwise
prev ± 1  // Normal increment/decrement
```

### Animation Keys

```javascript
// Force re-render on image change
key={`image-${selectedIndex}`}  // Image container
key={`lightbox-${selectedIndex}`}  // Modal (for transitions)

// Ensures:
// 1. Old image fades out
// 2. New image fades in
// 3. No stale content visible
```

### Keyboard Event Handling

```javascript
// Attached to window, not just modal
// Allows navigation even if focus lost
// Properly cleaned up on unmount/close

// preventDefault() prevents:
// - Page scroll on arrow keys
// - Browser back on Escape
```

### Touch Event Handling

```javascript
// Detects swipe direction and distance
const distance = start - end

// Left swipe (positive distance > 50px)
if (distance > 50) handleNext()

// Right swipe (negative distance < -50px)  
else if (distance < -50) handlePrev()

// Otherwise ignored (accidental touches)
```

### Body Scroll Prevention

```javascript
// When modal open
document.body.style.overflow = 'hidden'

// When modal closed
document.body.style.overflow = 'unset'

// Cleaned up in return statement
// Prevents scroll leak on component unmount
```

### Thumbnail Scroll

```javascript
// Auto-scroll active thumbnail into view
thumbnailScrollRef.current.querySelector('[data-active="true"]')
  .scrollIntoView({
    behavior: 'smooth',      // Smooth animation
    block: 'nearest',        // Minimal scroll
    inline: 'center'         // Center in view
  })
```

---

## Integration Points

### Firestore Integration
```javascript
const { data: images = [], loading } = useGallery() || {}

// Reads from 'gallery' collection
// Real-time updates when admin adds/removes images
// Safe default: empty array if no data
```

### ImageKit Integration
```javascript
<ResponsiveImage
  src={img?.image}  // ImageKit URL from Firestore
  alt={img?.title}
  className="..."
/>

// ResponsiveImage handles:
// - Lazy loading
// - Responsive sizing
// - Error handling
// - Format optimization
```

---

## Responsive Breakpoints

### Mobile (< 640px)
```javascript
// Grid: 2 columns
// Thumbnail height: h-16 (64px)
// Button padding: p-2
// Close button: -top-10 (outside modal)
```

### Tablet (640px - 1024px)
```javascript
// Grid: 2-3 columns
// Thumbnail height: h-20 (80px)
// Button padding: p-3
// Close button: sm:top-4 (inside)
```

### Desktop (> 1024px)
```javascript
// Grid: 3-4 columns
// Thumbnail height: h-20 (80px)
// Button padding: p-3
// Full keyboard hints visible
```

---

## Error Handling

### Null Safety
```javascript
// Safe navigation on empty images array
if (!images?.length) return

// Safe property access
images[selectedIndex]?.image
images[selectedIndex]?.title || 'Gallery item'

// Safe defaults
data: images = []
loading
error
```

### Boundary Checking
```javascript
// Index bounds validation
Math.max(-1, Math.min(newIndex, images.length - 1))

// Thumbnail click validation
if (index >= 0 && index < images.length)
```

### Touch Event Fallbacks
```javascript
// Optional chaining for touch properties
e.targetTouches?.[0]?.clientX || 0
e.changedTouches?.[0]?.clientX || 0
```

---

## Performance Considerations

### Optimizations Made
- Image containers use motion keys (force re-render only on change)
- Touch events are lightweight (no expensive computations)
- Keyboard listeners cleaned up properly (no memory leaks)
- Scroll behavior uses `scroll-smooth` (GPU-accelerated)
- Animations use framer-motion (optimized)

### Memory Management
```javascript
// Cleanup keyboard listener
useEffect(() => {
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [...deps])

// Cleanup scroll prevention
useEffect(() => {
  if (selectedIndex >= 0) {
    document.body.style.overflow = 'hidden'
  }
  return () => {
    document.body.style.overflow = 'unset'
  }
}, [selectedIndex])
```

---

## Debugging Tips

### Check Console Logs
```javascript
// Add debug logging
console.log('selectedIndex:', selectedIndex)
console.log('images.length:', images?.length)
console.log('current image:', images[selectedIndex])
```

### Verify Touch Events
```javascript
// In browser DevTools
// 1. Open modal
// 2. Inspect Image Container
// 3. Check Touch Simulation
// 4. Verify swipe detection
```

### Test Keyboard
```javascript
// Press arrow keys - should navigate
// Press Escape - should close
// No page scroll on arrows (preventDefault working)
```

### Verify Thumbnail Scroll
```javascript
// Open modal with many images
// Click different thumbnails
// Bottom strip should scroll to show active
// Active should have blue ring
```

---

## Common Customizations

### Change Swipe Threshold
```javascript
// Current: 50px
// Increase for larger swipe requirement
const isLeftSwipe = distance > 50  // Change to 75

// Decrease for sensitive detection
const isLeftSwipe = distance > 30  // Change to 30
```

### Change Animation Duration
```javascript
// Current: 300ms
// Faster: 200ms
// Slower: 500ms
transition={{ duration: 0.3 }}  // Change value
```

### Change Modal Max Width
```javascript
// Current: max-w-5xl
// Larger: max-w-7xl
// Smaller: max-w-4xl
className="max-w-5xl"  // Change Tailwind class
```

### Change Thumbnail Size
```javascript
// Current: h-16 sm:h-20
// Larger: h-20 sm:h-24
// Smaller: h-12 sm:h-16
className="h-16 sm:h-20"  // Change Tailwind classes
```

---

## Troubleshooting

### Issue: Navigation buttons don't work
**Solution**: Check if `handleNext()` and `handlePrev()` have `if (!images?.length) return`

### Issue: Thumbnails not showing
**Solution**: Check if thumbnails div is visible on modal (should be below info)

### Issue: Swipe not working on mobile
**Solution**: Verify `onTouchStart` and `onTouchEnd` are on image container, not modal

### Issue: Keyboard not working
**Solution**: Check if modal has `tabIndex={0}` and `ref={modalRef}`, and keyboard listener is in useEffect

### Issue: Images stretched
**Solution**: Verify `object-contain` is applied to ResponsiveImage, not `object-cover`

### Issue: Thumbnails not syncing
**Solution**: Check if `data-active={idx === selectedIndex}` is correctly set

---

## File Location

**src/pages/Gallery.jsx** - Main component with all fixes

## Dependencies

```javascript
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useGallery } from '@/hooks/useFirestore'
import ResponsiveImage from '@/components/common/ResponsiveImage'
```

## No External Libraries Added

✅ Uses existing dependencies only
✅ No new npm packages needed
✅ Compatible with current Tailwind CSS setup
✅ Works with existing Framer Motion animations

