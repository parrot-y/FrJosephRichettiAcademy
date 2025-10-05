# Fr. Joseph Richetti Catholic School Website

A modern, professional website for Fr. Joseph Richetti Catholic School built with HTML5, CSS3, and JavaScript. The website showcases the school's commitment to academic excellence and character development with the motto "Right is Light."

## 🏫 About the School

Fr. Joseph Richetti Catholic School is a premier educational institution committed to:
- Academic Excellence
- Character Development  
- Holistic Growth
- Spiritual Formation
- Global Citizenship

**Contact Information:**
- 📧 Email: frjosephrichetti@gmail.com
- 📞 Phone: +254 712 345 678
- 📍 Location: Nairobi, Kenya

## ✨ Features

### 🎓 Academic Programs (CBC Curriculum)
- **Pre-Primary (PP1 & PP2)**: Language Activities, Mathematical Activities, Environmental Activities, Psychomotor & Creative Activities, Religious Activities
- **Lower Primary (Grade 1-3)**: English, Kiswahili, Literacy, Mathematics, Environmental Activities, Hygiene & Nutrition, Creative Arts, Movement Activities, Religious Education
- **Upper Primary (Grade 4-6)**: English, Kiswahili, Mathematics, Science & Technology, Agriculture, Home Science, Creative Arts, Physical & Health Education, Social Studies, Religious Education, Life Skills
- **Junior Secondary (Grade 7-9)**: English, Kiswahili, Mathematics, Integrated Science, Social Studies, Business Studies, Agriculture, Computer Science, Life Skills, Health Education, Pre-Technical & Pre-Career Studies, Physical Education & Sports, Visual & Performing Arts, Religious Education

### 🏆 Key Sections
- **Home**: Welcome banner with school motto and mission
- **About**: School heritage, statistics, and core values
- **Admissions**: Requirements, procedures, and fee information
- **Academic Programs**: Interactive CBC curriculum display
- **Activities & Clubs**: Scouts, Taekwondo, Volleyball, Football, Skating, Drama
- **Achievements**: Success rates, staff information, and awards
- **Downloads**: Forms and documents for parents and students
- **Contact**: Functional contact form with email integration

### 💻 Technical Features
- **Responsive Design**: Mobile-first approach, works on all devices
- **Interactive Elements**: Tabbed curriculum, hover effects, smooth animations
- **Contact Form**: PHP backend with email functionality
- **Modern UI/UX**: Professional Catholic school aesthetic
- **Performance Optimized**: Fast loading times and smooth interactions
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🎨 Design & Branding

### Color Scheme
- **Primary**: Navy Blue (#1e3a8a)
- **Secondary**: Bermuda Blue (template blue)
- **Accent**: Gold (#f5a425)
- **Background**: White (#fff)
- **Text**: Dark Gray (#1f272b)

### Typography
- Clean, professional fonts
- Consistent sizing and spacing
- Readable across all devices
- Proper hierarchy and contrast

## 🚀 Getting Started

### Prerequisites
- Web server (Apache/Nginx) for PHP contact form
- PHP 7.4+ with mail() function enabled
- Modern web browser

### Installation
1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd fatherJosephRichetti
   ```

2. Set up web server to serve the files

3. Configure email settings in `contact_handler.php`:
   ```php
   $school_email = "frjosephrichetti@gmail.com";
   ```

4. Add the school logo:
   - Save logo as `assets/images/school-logo.png`
   - Recommended size: 200x200px
   - Format: PNG with transparency

### File Structure
```
fatherJosephRichetti/
├── index.html                 # Main website file
├── contact_handler.php        # Contact form backend
├── netlify.toml              # Deployment configuration
├── assets/
│   ├── css/
│   │   ├── templatemo-edu-meeting.css  # Main template styles
│   │   ├── cbc-programs.css           # Academic programs styling
│   │   ├── contact-form.css           # Contact form styling
│   │   └── school-logo.css            # Logo and branding styles
│   ├── js/
│   │   ├── custom.js                  # Template JavaScript
│   │   ├── cbc-programs.js            # Academic programs functionality
│   │   └── contact-form.js            # Contact form handling
│   ├── images/                        # School images and assets
│   └── fonts/                         # Web fonts
└── README.md                          # This file
```

## 📧 Contact Form Setup

The website includes a fully functional contact form that sends emails directly to the school. See `README_CONTACT_SETUP.md` for detailed setup instructions.

### Quick Setup Options:
1. **PHP Server** (Recommended): Use included `contact_handler.php`
2. **Formspree**: Third-party service for form handling
3. **Netlify Forms**: If hosting on Netlify
4. **EmailJS**: Client-side email service

## 🎯 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main)

### Netlify
1. Connect GitHub repository to Netlify
2. Deploy automatically with included `netlify.toml`
3. Configure form handling if needed

### Traditional Web Hosting
1. Upload files via FTP/SFTP
2. Ensure PHP support for contact form
3. Configure email settings

## 🛠️ Customization

### Adding Content
- Update school information in `index.html`
- Modify contact details throughout the site
- Add/remove academic programs as needed
- Update activities and clubs section

### Styling Changes
- Modify colors in CSS files
- Update fonts and typography
- Adjust responsive breakpoints
- Customize animations and effects

### Functionality Enhancements
- Add more interactive elements
- Integrate with school management system
- Add online payment processing
- Implement user authentication

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is based on the "Edu Meeting" template by TemplateMo and has been customized for Fr. Joseph Richetti Catholic School.

## 🙏 Acknowledgments

- **TemplateMo** for the original "Edu Meeting" template
- **Bootstrap** for the responsive framework
- **FontAwesome** for the icons
- **jQuery** for JavaScript functionality

## 📞 Support

For technical support or questions about the website:
- Email: frjosephrichetti@gmail.com
- Phone: +254 712 345 678

---

**Fr. Joseph Richetti Catholic School** - "Right is Light" ✨
