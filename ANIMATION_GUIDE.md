# 🎬 Scroll Animation Guide - Fr. Joseph Richetti Catholic School

## Overview
Modern, elegant scroll-based animations using **AOS.js (Animate On Scroll)** library. Elements smoothly fade in, slide up, or zoom as users scroll through the website.

---

## 🚀 Quick Start

### Adding Animation to Any Element
```html
<div data-aos="fade-up" data-aos-duration="800" data-aos-delay="0">
  Your content here
</div>
```

That's it! The element will now animate when scrolling into view.

---

## 📚 Available Animation Types

### **Recommended for Your Site**

1. **`fade-up`** - Fade in from bottom
   - **Best for:** Cards, content blocks
   - **Example:** About cards, Activity cards
   ```html
   <div data-aos="fade-up">Card content</div>
   ```

2. **`fade-down`** - Fade in from top
   - **Best for:** Section headings, titles
   - **Example:** "About Our Academy" heading
   ```html
   <h2 data-aos="fade-down">Section Title</h2>
   ```

3. **`zoom-in`** - Scale up from smaller
   - **Best for:** Important elements, Call-to-action buttons
   - **Example:** Activities/Clubs cards
   ```html
   <div data-aos="zoom-in">Activity card</div>
   ```

4. **`fade-left`** - Slide in from right
   - **Best for:** Images, alternating content
   ```html
   <img data-aos="fade-left" src="image.jpg">
   ```

5. **`fade-right`** - Slide in from left
   - **Best for:** Text blocks, sidebars
   ```html
   <div data-aos="fade-right">Text content</div>
   ```

### Other Available Animations
- `slide-up` - Sharp slide from bottom
- `slide-down` - Sharp slide from top
- `flip-left` - 3D flip effect (use sparingly!)
- `flip-right` - 3D flip effect
- `zoom-out` - Scale down from larger

---

## ⚙️ Customization Options

### Duration (Animation Speed)
Controls how long the animation takes:

```html
<!-- Fast (600ms) -->
<div data-aos="fade-up" data-aos-duration="600">Quick fade</div>

<!-- Smooth (800ms) - RECOMMENDED -->
<div data-aos="fade-up" data-aos-duration="800">Smooth fade</div>

<!-- Slow (1200ms) -->
<div data-aos="fade-up" data-aos-duration="1200">Slow fade</div>
```

**Recommendation:** Use **800ms** for most elements - it's professional and elegant.

---

### Delay (Staggered Timing)
Creates sequence where elements appear one after another:

```html
<!-- First card - appears immediately -->
<div data-aos="fade-up" data-aos-delay="0">Card 1</div>

<!-- Second card - appears 100ms later -->
<div data-aos="fade-up" data-aos-delay="100">Card 2</div>

<!-- Third card - appears 200ms later -->
<div data-aos="fade-up" data-aos-delay="200">Card 3</div>

<!-- Fourth card - appears 300ms later -->
<div data-aos="fade-up" data-aos-delay="300">Card 4</div>
```

**Pattern:** Increment by 100ms for smooth staggering.

---

### Easing (Animation Style)
Controls the "feel" of the animation:

```html
<!-- Smooth deceleration (default - RECOMMENDED) -->
<div data-aos="fade-up" data-aos-easing="ease-out-cubic">

<!-- Linear (constant speed) -->
<div data-aos="fade-up" data-aos-easing="linear">

<!-- Bounce effect -->
<div data-aos="fade-up" data-aos-easing="ease-out-back">
```

**Recommendation:** Stick with `ease-out-cubic` - it's professional.

---

### Offset (When to Trigger)
Controls how far before entering viewport the animation starts:

```html
<!-- Trigger 100px before visible (default) -->
<div data-aos="fade-up" data-aos-offset="100">

<!-- Trigger 200px before visible (earlier) -->
<div data-aos="fade-up" data-aos-offset="200">

<!-- Trigger 50px before visible (later) -->
<div data-aos="fade-up" data-aos-offset="50">
```

---

## 🎨 Common Patterns

### Section Heading
```html
<div class="section-heading" data-aos="fade-down" data-aos-duration="800">
  <h2>Section Title</h2>
  <p>Description text</p>
</div>
```

### Card Grid (4 cards)
```html
<div class="row">
  <div class="col-lg-6">
    <div class="card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="0">
      First card
    </div>
  </div>
  <div class="col-lg-6">
    <div class="card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
      Second card
    </div>
  </div>
  <div class="col-lg-6">
    <div class="card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
      Third card
    </div>
  </div>
  <div class="col-lg-6">
    <div class="card" data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
      Fourth card
    </div>
  </div>
</div>
```

### Call-to-Action Button
```html
<a href="#" class="btn" data-aos="zoom-in" data-aos-duration="600">
  Apply Now
</a>
```

### Image with Text
```html
<div class="row">
  <div class="col-md-6" data-aos="fade-right">
    <img src="image.jpg" alt="Image">
  </div>
  <div class="col-md-6" data-aos="fade-left">
    <p>Text content here</p>
  </div>
</div>
```

---

## 📱 Mobile Optimization

Animations work on mobile! The system automatically:
- ✅ Keeps animations smooth on mobile devices
- ✅ Reduces complexity for better performance
- ✅ Respects user's "reduce motion" accessibility setting

---

## 🎯 Best Practices

### DO:
- ✅ Use `fade-up` for cards (most natural)
- ✅ Use `fade-down` for headings (establishes hierarchy)
- ✅ Stagger cards by 100ms increments
- ✅ Keep duration at 800ms for consistency
- ✅ Use animations sparingly - not everything needs to animate
- ✅ Test on mobile devices

### DON'T:
- ❌ Animate everything (overwhelming)
- ❌ Use delays over 500ms (frustrating)
- ❌ Mix too many animation types on one page
- ❌ Use complex animations like flip-left everywhere
- ❌ Forget to test scrolling experience

---

## 🛠️ Troubleshooting

### Animation not showing?
1. Check console for AOS initialization message
2. Verify element has `data-aos` attribute
3. Hard refresh: `Ctrl + Shift + R`
4. Check if element is inside viewport

### Animation too fast/slow?
- Adjust `data-aos-duration` (600-1200ms range)

### Animation triggers too late/early?
- Adjust `data-aos-offset` (50-200px range)

### Want to disable on specific element?
- Simply remove the `data-aos` attribute

---

## 🔧 Global Settings

Current global settings (in `index.html`):

```javascript
AOS.init({
  duration: 800,           // Default duration
  easing: 'ease-out-cubic', // Default easing
  once: true,              // Animate only once
  offset: 100,             // Trigger point
  disable: false,          // Enable on all devices
});
```

### To Change Global Settings:
Edit the `AOS.init()` call in your page's JavaScript section.

---

## 📊 Performance Tips

1. **Limit animated elements per section** - 4-8 items max
2. **Use `once: true`** - Animation happens only once (better performance)
3. **Avoid animating large images** - Can cause jank on mobile
4. **Test on slower devices** - Ensure smooth experience

---

## 🎨 Examples on Your Site

### Homepage About Section
```html
<!-- Heading -->
<div class="section-heading" data-aos="fade-down" data-aos-duration="800">
  <h2>About Our Academy</h2>
</div>

<!-- Cards with stagger -->
<div class="meeting-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="0">
  Heritage card
</div>
<div class="meeting-item" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
  Students card
</div>
```

### Activities Section
```html
<!-- Using zoom-in for variety -->
<div class="meeting-item" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="0">
  Activity 1
</div>
<div class="meeting-item" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="100">
  Activity 2
</div>
```

---

## 📝 Adding Animations to New Content

When adding new sections or cards, follow this pattern:

1. **Section heading:** `data-aos="fade-down"`
2. **First card:** `data-aos="fade-up" data-aos-delay="0"`
3. **Second card:** `data-aos="fade-up" data-aos-delay="100"`
4. **Third card:** `data-aos="fade-up" data-aos-delay="200"`
5. **And so on...**

---

## 🔗 Resources

- **AOS.js Documentation:** https://michalsnik.github.io/aos/
- **Custom CSS:** `assets/css/scroll-animations.css`
- **Examples:** See homepage sections for reference

---

## 💡 Pro Tips

1. **Preview animations** - Scroll slowly to see the effect
2. **Mix animation types** - Use fade-up for some sections, zoom-in for others
3. **Group similar content** - Same animation type for cards in same section
4. **Subtle is better** - Professional sites use restrained animations
5. **Mobile first** - Always test on mobile devices

---

**Need help?** Check the comments in `scroll-animations.css` for more details!
