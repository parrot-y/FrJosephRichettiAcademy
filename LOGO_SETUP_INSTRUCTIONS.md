# School Logo Setup Instructions

## Fr. Joseph Richetti Catholic School Logo Integration

The website has been prepared to display the official school logo. Here's how to complete the setup:

## Step 1: Save the Logo File

1. **Save the logo image** (the blue logo with "FR. JOSEPH RICHETTI CATHOLIC SCHOOL" and "RIGHT IS LIGHT" motto) as:
   ```
   assets/images/school-logo.png
   ```

2. **Recommended specifications:**
   - Format: PNG (for transparency) or JPG
   - Size: 200x200 pixels or similar square/rectangular ratio
   - Resolution: 72-96 DPI (web optimized)
   - File size: Under 100KB for fast loading

## Step 2: Logo Placement

The logo has been integrated in the following locations:

### Header Navigation
- **Location**: Top navigation bar next to school name
- **Size**: 50px height (45px on mobile)
- **Features**: Hover effect with slight scale animation
- **Responsive**: Automatically adjusts for mobile devices

### CSS Classes Applied:
- `.logo-img` - Main logo styling
- `.logo-text` - School name text styling
- Responsive breakpoints for mobile optimization

## Step 3: School Branding Elements

### School Motto Integration:
- **Motto**: "Right is Light" 
- **Location**: Added to main banner section
- **Styling**: Italic text with decorative elements (✦)
- **Colors**: Navy blue text with gold accents

### Color Scheme Maintained:
- **Primary**: Navy Blue (#1e3a8a)
- **Secondary**: Bermuda Blue (existing template blue)
- **Accent**: Gold/Yellow (#f5a425)
- **Background**: White (#fff)

## Step 4: Email Configuration Updated

### Contact Information:
- **School Email**: frjosephrichetti@gmail.com
- **Updated in**: 
  - Contact form handler (contact_handler.php)
  - Contact section display (index.html)
  - All email references throughout the site

## Step 5: Additional Logo Locations (Optional)

You can add the logo to other sections by using these CSS classes:

### Footer Logo:
```html
<img src="assets/images/school-logo.png" alt="School Logo" class="footer-logo">
```

### About Section Logo:
```html
<img src="assets/images/school-logo.png" alt="School Logo" class="about-logo">
```

## Step 6: Testing

After adding the logo file:

1. **Check header display** - Logo should appear next to school name
2. **Test responsiveness** - Verify logo scales properly on mobile
3. **Verify hover effects** - Logo should have subtle animation on hover
4. **Check loading speed** - Ensure logo doesn't slow down page load

## Step 7: SEO Optimization

The logo includes proper alt text for accessibility:
```html
alt="Fr. Joseph Richetti Catholic School Logo"
```

## Troubleshooting

### Common Issues:
1. **Logo not displaying**: Check file path and name exactly match
2. **Logo too large/small**: Adjust height values in school-logo.css
3. **Mobile display issues**: Check responsive CSS breakpoints
4. **Loading slowly**: Optimize image file size

### File Structure:
```
fatherJosephRichetti/
├── assets/
│   ├── images/
│   │   └── school-logo.png  ← Place logo here
│   └── css/
│       └── school-logo.css  ← Logo styling
└── index.html  ← Updated with logo integration
```

## Professional Appearance

The logo integration maintains the professional, international-standard appearance requested:

- ✅ Clean, modern design
- ✅ Consistent with school branding
- ✅ Mobile-responsive
- ✅ Fast loading
- ✅ Accessible (alt text included)
- ✅ Hover animations for interactivity

The website now properly represents Fr. Joseph Richetti Catholic School with official branding and the correct contact email address.
