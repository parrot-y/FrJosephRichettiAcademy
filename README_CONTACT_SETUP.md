# Contact Form Setup Instructions

## Father Joseph Richetti Academy Contact Form

The contact form has been set up to allow students and parents to send messages directly to the school. Here are the setup options:

## Option 1: PHP Server Setup (Recommended)

### Requirements:
- Web server with PHP support (Apache/Nginx)
- PHP mail() function enabled
- SMTP server configured

### Files Created:
- `contact_handler.php` - Processes form submissions
- `assets/js/contact-form.js` - Handles AJAX submission
- `assets/css/contact-form.css` - Styling for messages

### Configuration:
1. Update the email address in `contact_handler.php`:
   ```php
   $school_email = "info@fjrichetti.ac.ke"; // Change to actual school email
   ```

2. Configure your server's SMTP settings for the mail() function

### Features:
- ✅ Form validation (client and server-side)
- ✅ AJAX submission (no page reload)
- ✅ Success/error messages
- ✅ Email notifications to school
- ✅ Contact log file
- ✅ Spam protection

## Option 2: Third-Party Service (No PHP Required)

### Using Formspree (Free tier available):

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form id="contact" action="https://formspree.io/f/YOUR_FORM_ID" method="post">
   ```

### Using Netlify Forms (If hosted on Netlify):

1. Add `netlify` attribute to the form:
   ```html
   <form id="contact" netlify name="contact" method="post">
   ```

## Option 3: Email Service Integration

### Using EmailJS (Client-side only):

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Set up email service and template
3. Replace the JavaScript in `contact-form.js` with EmailJS code

## Testing the Contact Form

### Test Cases:
1. **Valid Submission**: Fill all fields correctly
2. **Empty Fields**: Try submitting with empty required fields
3. **Invalid Email**: Test with malformed email addresses
4. **Long Messages**: Test with very long message content

### Expected Behavior:
- Form validation prevents submission of invalid data
- Success message appears after successful submission
- Error messages show for failed submissions
- Form clears after successful submission
- Email is received at the school address

## Security Considerations

1. **Input Sanitization**: All inputs are sanitized in PHP
2. **Email Validation**: Server-side email validation
3. **Rate Limiting**: Consider adding rate limiting for production
4. **CAPTCHA**: Add reCAPTCHA for additional spam protection

## Troubleshooting

### Common Issues:
1. **PHP mail() not working**: Check server SMTP configuration
2. **AJAX errors**: Check browser console for JavaScript errors
3. **Form not submitting**: Verify form action URL is correct
4. **Emails not received**: Check spam folder, verify email address

### Debug Mode:
Enable error reporting in `contact_handler.php` for debugging:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Production Deployment

### Before Going Live:
1. ✅ Test form submission thoroughly
2. ✅ Verify email delivery
3. ✅ Disable PHP error reporting
4. ✅ Set up proper email server
5. ✅ Add SSL certificate
6. ✅ Configure backup email addresses

### Monitoring:
- Check `contact_log.txt` for submission logs
- Monitor email delivery rates
- Set up email alerts for form submissions

## Support

For technical support with the contact form setup, please refer to:
- PHP documentation for mail() function
- Your hosting provider's email configuration guide
- The service documentation for third-party options
