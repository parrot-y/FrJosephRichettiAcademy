// Fr. Joseph Richetti Catholic School - CBC Programs JavaScript
// Handles tab functionality and animations for the academic programs section

document.addEventListener('DOMContentLoaded', function() {
    initializeCBCTabs();
    addScrollAnimations();
});

function initializeCBCTabs() {
    const tabButtons = document.querySelectorAll('.cbc-tab-btn');
    const tabContents = document.querySelectorAll('.cbc-tab-content');
    
    if (tabButtons.length === 0) return;
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Trigger animation for subject cards
                animateSubjectCards(targetContent);
            }
            
            // Track tab switching for analytics (optional)
            trackTabSwitch(targetTab);
        });
    });
    
    // Initialize first tab
    if (tabButtons[0]) {
        const firstTab = tabButtons[0].getAttribute('data-tab');
        const firstContent = document.getElementById(firstTab);
        if (firstContent) {
            animateSubjectCards(firstContent);
        }
    }
}

function animateSubjectCards(container) {
    const cards = container.querySelectorAll('.cbc-subject-card');
    
    // Reset animation
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Animate cards with stagger effect
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function addScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe CBC program elements
    const elementsToAnimate = document.querySelectorAll('.cbc-programs-container, .cbc-level-header, .cbc-download-section');
    elementsToAnimate.forEach(el => observer.observe(el));
}

function trackTabSwitch(tabName) {
    // Optional: Track tab switches for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'tab_switch', {
            'event_category': 'CBC Programs',
            'event_label': tabName,
            'value': 1
        });
    }
    
    // Console log for debugging
    console.log(`CBC Tab switched to: ${tabName}`);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.cbc-tab-btn.active');
    if (!activeTab) return;
    
    const tabButtons = Array.from(document.querySelectorAll('.cbc-tab-btn'));
    const currentIndex = tabButtons.indexOf(activeTab);
    
    let nextIndex = currentIndex;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            nextIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
            break;
        case 'Home':
            e.preventDefault();
            nextIndex = 0;
            break;
        case 'End':
            e.preventDefault();
            nextIndex = tabButtons.length - 1;
            break;
        default:
            return;
    }
    
    if (nextIndex !== currentIndex) {
        tabButtons[nextIndex].click();
        tabButtons[nextIndex].focus();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.cbc-programs-container')) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.cbc-programs-container')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) < swipeThreshold) return;
    
    const activeTab = document.querySelector('.cbc-tab-btn.active');
    if (!activeTab) return;
    
    const tabButtons = Array.from(document.querySelectorAll('.cbc-tab-btn'));
    const currentIndex = tabButtons.indexOf(activeTab);
    
    let nextIndex = currentIndex;
    
    if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        nextIndex = currentIndex - 1;
    } else if (swipeDistance < 0 && currentIndex < tabButtons.length - 1) {
        // Swipe left - go to next tab
        nextIndex = currentIndex + 1;
    }
    
    if (nextIndex !== currentIndex) {
        tabButtons[nextIndex].click();
    }
}

// Auto-advance tabs (optional feature - can be enabled)
function enableAutoAdvance(intervalMs = 10000) {
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(() => {
            const activeTab = document.querySelector('.cbc-tab-btn.active');
            const tabButtons = Array.from(document.querySelectorAll('.cbc-tab-btn'));
            const currentIndex = tabButtons.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabButtons.length;
            
            tabButtons[nextIndex].click();
        }, intervalMs);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    // Start auto-advance
    startAutoAdvance();
    
    // Stop on user interaction
    document.querySelectorAll('.cbc-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            stopAutoAdvance();
            // Restart after 30 seconds of inactivity
            setTimeout(startAutoAdvance, 30000);
        });
    });
    
    // Stop on hover
    const container = document.querySelector('.cbc-programs-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoAdvance);
        container.addEventListener('mouseleave', startAutoAdvance);
    }
}

// Uncomment the line below to enable auto-advance (10 seconds interval)
// enableAutoAdvance(10000);
