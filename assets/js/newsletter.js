// Fr. Joseph Richetti Catholic School - Newsletter Subscription JavaScript
// Handles newsletter form submission with AJAX and user feedback

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!email) {
                showNewsletterMessage('Please enter your email address.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';
            
            // Remove any existing messages
            removeExistingNewsletterMessages();
            
            // Send AJAX request
            console.log("Sending request to:", "newsletter_handler.php");
            fetch('newsletter_handler.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNewsletterMessage(data.message, 'success');
                    emailInput.value = ''; // Clear the input
                    
                    // Show additional success info
                    setTimeout(() => {
                        showNewsletterMessage('You will receive updates about school events, academic announcements, and important notices.', 'info');
                    }, 2000);
                } else {
                    showNewsletterMessage(data.message, 'error');
                }
            })
            .catch(error => {
                console.error("Newsletter Error Details:", error); alert("Debug: " + error.message);
                showNewsletterMessage('An error occurred. Please try again or contact us directly at frjosephrichetti@gmail.com', 'error');
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
            });
        });
    }
    
    function showNewsletterMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message ${type}`;
        
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fa fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fa fa-exclamation-triangle"></i>';
                break;
            case 'info':
                icon = '<i class="fa fa-info-circle"></i>';
                break;
        }
        
        messageDiv.innerHTML = `
            <div class="message-content">
                ${icon}
                <span>${message}</span>
            </div>
        `;
        
        // Insert message after the form
        const newsletterSubscribe = document.querySelector('.newsletter-subscribe');
        if (newsletterSubscribe) {
            newsletterSubscribe.appendChild(messageDiv);
        }
        
        // Auto-hide messages after 8 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 8000);
    }
    
    function removeExistingNewsletterMessages() {
        const existingMessages = document.querySelectorAll('.newsletter-message');
        existingMessages.forEach(msg => msg.remove());
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});

// Add CSS for newsletter messages dynamically
const newsletterMessageStyles = `
    .newsletter-message {
        margin-top: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        animation: slideDown 0.3s ease-out;
    }
    
    .newsletter-message.success {
        background-color: rgba(72, 187, 120, 0.1);
        color: #38a169;
        border: 1px solid rgba(72, 187, 120, 0.3);
    }
    
    .newsletter-message.error {
        background-color: rgba(245, 101, 101, 0.1);
        color: #e53e3e;
        border: 1px solid rgba(245, 101, 101, 0.3);
    }
    
    .newsletter-message.info {
        background-color: rgba(66, 153, 225, 0.1);
        color: #3182ce;
        border: 1px solid rgba(66, 153, 225, 0.3);
    }
    
    .newsletter-message .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .newsletter-message .message-content i {
        font-size: 16px;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .newsletter-message {
            margin: 15px 10px 0;
            padding: 12px 15px;
            font-size: 13px;
        }
        
        .newsletter-message .message-content {
            gap: 8px;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = newsletterMessageStyles;
document.head.appendChild(styleSheet);
