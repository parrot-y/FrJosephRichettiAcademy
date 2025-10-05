// Father Joseph Richetti Academy - Contact Form JavaScript
// Handles form submission with AJAX and user feedback

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact');
    const submitButton = document.getElementById('form-submit');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'SENDING...';
            
            // Remove any existing messages
            removeExistingMessages();
            
            // Send AJAX request
            fetch('contact_handler_local.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(data.message, 'success');
                    contactForm.reset(); // Clear form
                } else {
                    showMessage(data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('An error occurred. Please try again or contact us directly.', 'error');
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = 'SEND MESSAGE NOW';
            });
        });
    }
    
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `contact-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fa fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert message before the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }
    
    function removeExistingMessages() {
        const existingMessages = document.querySelectorAll('.contact-message');
        existingMessages.forEach(msg => msg.remove());
    }
});

// Enhanced form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    let errors = [];
    
    if (!name) {
        errors.push('Name is required');
        isValid = false;
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Valid email address is required');
        isValid = false;
    }
    
    if (!subject) {
        errors.push('Subject is required');
        isValid = false;
    }
    
    if (!message) {
        errors.push('Message is required');
        isValid = false;
    }
    
    return { isValid, errors };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
