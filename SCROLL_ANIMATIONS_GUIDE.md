# Scroll Animations Guide

## Overview
Your website now has smooth, professional scroll-based animations using AOS (Animate On Scroll) library. Elements fade in, slide up, and zoom into view as users scroll.

## How to Add Animations to Elements

### Basic Usage
Add `data-aos` attribute to any HTML element:

```html
<!-- Fade in -->
<div data-aos="fade-up">Your content here</div>

<!-- Zoom in -->
<div data-aos="zoom-in">Your content here</div>

<!-- Slide from left -->
<div data-aos="fade-right">Your content here</div>
```

## Available Animation Types

### Fade Animations
- `data-aos="fade-up"` - Fade in from bottom
- `data-aos="fade-down"` - Fade in from top
- `data-aos="fade-left"` - Fade in from right
- `data-aos="fade-right"` - Fade in from left
- `data-aos="fade"` - Simple fade in

### Zoom Animations
- `data-aos="zoom-in"` - Zoom in
- `data-aos="zoom-in-up"` - Zoom in from bottom
- `data-aos="zoom-in-down"` - Zoom in from top
- `data-aos="zoom-out"` - Zoom out

### Flip Animations
- `data-aos="flip-left"` - Flip from left
- `data-aos="flip-right"` - Flip from right
- `data-aos="flip-up"` - Flip from bottom
- `data-aos="flip-down"` - Flip from top

### Slide Animations
- `data-aos="slide-up"` - Slide up
- `data-aos="slide-down"` - Slide down
- `data-aos="slide-left"` - Slide from right
- `data-aos="slide-right"` - Slide from left

## Customizing Individual Elements

### Duration (How long animation takes)
```html
<!-- Fast animation (400ms) -->
<div data-aos="fade-up" data-aos-duration="400">Fast</div>

<!-- Normal animation (800ms) - default -->
<div data-aos="fade-up" data-aos-duration="800">Normal</div>

<!-- Slow animation (1200ms) -->
<div data-aos="fade-up" data-aos-duration="1200">Slow</div>
```

### Delay (When animation starts)
```html
<!-- No delay -->
<div data-aos="fade-up" data-aos-delay="0">First</div>

<!-- 100ms delay -->
<div data-aos="fade-up" data-aos-delay="100">Second</div>

<!-- 200ms delay -->
<div data-aos="fade-up" data-aos-delay="200">Third</div>
```

### Easing (Animation curve)
```html
<!-- Linear -->
<div data-aos="fade-up" data-aos-easing="linear">Linear</div>

<!-- Ease (default) -->
<div data-aos="fade-up" data-aos-easing="ease">Ease</div>

<!-- Ease in out -->
<div data-aos="fade-up" data-aos-easing="ease-in-out">Smooth</div>
```

### Offset (When to trigger)
```html
<!-- Trigger 200px before element enters viewport -->
<div data-aos="fade-up" data-aos-offset="200">Early trigger</div>

<!-- Trigger 50px before element enters viewport -->
<div data-aos="fade-up" data-aos-offset="50">Late trigger</div>
```

## Staggered Animations (Multiple Cards)

For cards appearing in sequence:

```html
<div class="row">
  <!-- Card 1 - appears first -->
  <div class="col-md-4" data-aos="fade-up" data-aos-delay="0">
    <div class="card">Card 1</div>
  </div>
  
  <!-- Card 2 - appears 100ms after card 1 -->
  <div class="col-md-4" data-aos="fade-up" data-aos-delay="100">
    <div class="card">Card 2</div>
  </div>
  
  <!-- Card 3 - appears 200ms after card 1 -->
  <div class="col-md-4" data-aos="fade-up" data-aos-delay="200">
    <div class="card">Card 3</div>
  </div>
</div>
```

## Example Implementations

### Section with Heading and Cards
```html
<section class="section">
  <!-- Heading fades in first -->
  <h2 data-aos="fade-down" data-aos-duration="600">Our Programs</h2>
  
  <!-- Cards appear in sequence -->
  <div class="row">
    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="0">
      <div class="card animated-card">Program 1</div>
    </div>
    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="150">
      <div class="card animated-card">Program 2</div>
    </div>
    <div class="col-md-4" data-aos="zoom-in" data-aos-delay="300">
      <div class="card animated-card">Program 3</div>
    </div>
  </div>
</section>
```

### Image with Text
```html
<div class="row">
  <!-- Image slides from left -->
  <div class="col-md-6" data-aos="fade-right" data-aos-duration="800">
    <div class="reveal-image">
      <img src="image.jpg" alt="Description">
    </div>
  </div>
  
  <!-- Text slides from right -->
  <div class="col-md-6" data-aos="fade-left" data-aos-duration="800">
    <h3>About Us</h3>
    <p>Your content here...</p>
  </div>
</div>
```

### Parallax Background Section
```html
<section class="parallax-section" 
         style="background-image: url('background.jpg');">
  <div data-aos="fade-up">
    <h2>Beautiful Parallax Section</h2>
  </div>
</section>
```

## Global Settings

To change animation behavior for the entire site, edit these values in the JavaScript:

```javascript
AOS.init({
  duration: 800,    // Change to 600 for faster, 1000 for slower
  easing: 'ease-out-cubic', // Animation curve
  once: true,       // Set to false to animate every time
  offset: 120,      // Trigger point (pixels from bottom)
  delay: 0,         // Global delay
});
```

## Performance Tips

1. **Don't overuse** - Animate key elements only
2. **Use `once: true`** - Animations happen once (better performance)
3. **Avoid animating large images** - Use on containers instead
4. **Test on mobile** - Ensure smooth performance

## Disabling Animations

### For specific elements
```html
<div data-aos="fade-up" data-aos-disable="mobile">
  Won't animate on mobile
</div>
```

### For accessibility (respects user preferences)
Animations automatically disable for users who prefer reduced motion.

## Common Patterns

### Hero Section
```html
<section class="hero">
  <h1 data-aos="fade-down" data-aos-duration="600">Welcome</h1>
  <p data-aos="fade-up" data-aos-delay="200">Subtitle</p>
  <a href="#" data-aos="zoom-in" data-aos-delay="400">Button</a>
</section>
```

### Feature Cards (3 columns)
```html
<div class="row">
  <div class="col-md-4" data-aos="flip-left" data-aos-delay="0">
    Feature 1
  </div>
  <div class="col-md-4" data-aos="flip-left" data-aos-delay="150">
    Feature 2
  </div>
  <div class="col-md-4" data-aos="flip-left" data-aos-delay="300">
    Feature 3
  </div>
</div>
```

### Timeline/Steps
```html
<div class="timeline">
  <div class="step" data-aos="fade-right" data-aos-delay="0">Step 1</div>
  <div class="step" data-aos="fade-left" data-aos-delay="200">Step 2</div>
  <div class="step" data-aos="fade-right" data-aos-delay="400">Step 3</div>
</div>
```

## Troubleshooting

### Animations not working?
1. Check that AOS CSS and JS are loaded
2. Ensure `AOS.init()` is called after page load
3. Verify element has `data-aos` attribute
4. Check browser console for errors

### Animations too fast/slow?
Adjust `data-aos-duration` on individual elements or change global `duration` setting.

### Elements appearing before animation?
Increase `data-aos-offset` value to trigger animation earlier.

## Best Practices

✅ **Do:**
- Use subtle animations (fade-up, zoom-in)
- Stagger multiple items (100-200ms delay between)
- Keep duration between 600-1000ms
- Test on mobile devices

❌ **Don't:**
- Animate everything
- Use very long durations (>1500ms)
- Mix too many animation types
- Forget accessibility (reduced motion)

## Need Help?

All settings are in the JavaScript initialization block. Look for:
```javascript
AOS.init({ ... })
```

Adjust values there to change global behavior!
