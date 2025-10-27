# Fr. Joseph Richetti Catholic School - Deployment Guide

## 🚀 How to Deploy with PHP Features (Newsletter & Contact Form)

### 📋 Required Files for PHP Hosting

Upload these files to your PHP hosting provider:

#### **Core Website Files:**
- `index.html` - Main website
- `assets/` folder - All CSS, JS, images
- `vendor/` folder - Bootstrap and dependencies

#### **PHP Backend Files:**
- `newsletter_handler.php` - Newsletter subscription processing
- `newsletter_admin.php` - Newsletter management panel
- `contact_handler.php` - Contact form processing  
- `contact_admin.php` - Contact form management panel

#### **Documentation:**
- `NEWSLETTER_SETUP.md` - Newsletter system documentation
- `README.md` - Project documentation

### 🌐 Recommended PHP Hosting Providers

#### **Free Options (Testing):**
1. **InfinityFree** - infinityfree.net
   - Free PHP hosting with MySQL
   - No ads on free plan
   - Good for testing

2. **000webhost** - 000webhost.com
   - 1GB storage, PHP 7.4+
   - Free SSL certificate
   - Easy file manager

#### **Paid Options (Production):**
1. **Hostinger** - $1.99/month
   - Fast SSD storage
   - Free SSL & domain
   - 24/7 support

2. **Bluehost** - $2.95/month
   - WordPress optimized
   - Free domain for 1 year
   - Reliable uptime

### 📁 Deployment Steps

#### **Step 1: Upload Files**
1. Connect to your hosting via FTP or File Manager
2. Upload all files to the `public_html` or `www` directory
3. Ensure file permissions are set correctly (644 for files, 755 for folders)

#### **Step 2: Test the Website**
1. Visit your domain: `https://yourdomain.com`
2. Test newsletter subscription
3. Test contact form
4. Verify all sections load properly

#### **Step 3: Access Admin Panels**
- **Newsletter Admin**: `https://yourdomain.com/newsletter_admin.php`
- **Contact Admin**: `https://yourdomain.com/contact_admin.php`
- **Login Credentials**: `admin` / `FrJoseph2024!`

#### **Step 4: Configure Email (Important!)**
Most hosting providers require SMTP configuration for sending emails.

**Update these files with your hosting SMTP settings:**
- `newsletter_handler.php` (lines 80-120)
- `contact_handler.php` (lines 50-80)

**Common SMTP Settings:**
```php
// Example for most hosting providers
$smtp_host = "mail.yourdomain.com";
$smtp_port = 587;
$smtp_username = "noreply@yourdomain.com";
$smtp_password = "your_email_password";
```

### 🔒 Security Checklist

#### **Change Default Passwords:**
Edit these files and update passwords:
- `newsletter_admin.php` (line 7)
- `contact_admin.php` (line 7)

#### **File Permissions:**
- PHP files: 644
- Directories: 755
- Admin panels: Consider 640 for extra security

#### **Email Security:**
- Use strong SMTP passwords
- Enable two-factor authentication on email accounts
- Consider using dedicated email service (SendGrid, Mailgun)

### 📊 Admin Panel Features

#### **Newsletter Admin Panel:**
- View all subscribers with dates and IP addresses
- Export subscriber list as CSV
- Real-time statistics (total, daily, weekly)
- Activity log for troubleshooting
- Instructions for sending newsletters

#### **Contact Admin Panel:**
- View all contact form submissions
- Export messages as CSV
- Filter by date and status
- Response tracking
- Direct email links for follow-up

### 🧪 Testing Checklist

Before going live, test:
- [ ] Website loads correctly
- [ ] Newsletter subscription works
- [ ] Confirmation emails are sent
- [ ] Contact form submissions work
- [ ] Admin panels are accessible
- [ ] CSV exports function
- [ ] Mobile responsiveness
- [ ] All buttons use correct maroon color
- [ ] No blue colors anywhere on site

### 📧 Email Configuration Examples

#### **For Hostinger:**
```php
$smtp_host = "smtp.hostinger.com";
$smtp_port = 587;
$smtp_secure = "tls";
```

#### **For Bluehost:**
```php
$smtp_host = "mail.yourdomain.com";
$smtp_port = 587;
$smtp_secure = "tls";
```

#### **For cPanel Hosting:**
```php
$smtp_host = "localhost";
$smtp_port = 587;
$smtp_secure = "tls";
```

### 🆘 Troubleshooting

#### **Newsletter Not Working:**
1. Check file permissions on `newsletter_subscribers.json`
2. Verify SMTP settings in `newsletter_handler.php`
3. Check hosting provider's email sending limits
4. Look at `newsletter_subscriptions.log` for errors

#### **Contact Form Not Working:**
1. Verify PHP version (7.4+ recommended)
2. Check `contact_submissions.json` permissions
3. Test SMTP configuration
4. Review `contact_submissions.log`

#### **Admin Panels Not Loading:**
1. Ensure PHP sessions are enabled
2. Check file permissions (644)
3. Verify password in admin files
4. Clear browser cache

### 📞 Support

For technical support with the website:
- Check the logs in admin panels
- Verify hosting provider PHP settings
- Contact hosting support for server issues

### 🎯 Go Live Checklist

- [ ] All files uploaded to hosting
- [ ] Domain pointing to hosting
- [ ] SSL certificate installed
- [ ] Email configuration tested
- [ ] Admin passwords changed
- [ ] Newsletter subscription tested
- [ ] Contact form tested
- [ ] Mobile responsiveness verified
- [ ] All colors consistent (maroon theme)

**Your Fr. Joseph Richetti Catholic School website is ready for production!** 🏫✨
