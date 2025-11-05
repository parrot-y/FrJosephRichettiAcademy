// Fr. Joseph Richetti Catholic School - Fixed Mobile Navigation

console.log('Mobile navigation JS loaded');

function setupMobileNav() {
    if (document.documentElement.dataset.mobileNavInitialized === 'true') {
        return; // avoid duplicate init
    }
    document.documentElement.dataset.mobileNavInitialized = 'true';

    console.log('Setting up mobile menu');

    // Prefer explicit id, then class fallback
    let menuTrigger = document.querySelector('#mobile-menu-trigger, .menu-trigger');
    // Scope to the primary header nav on the page
    let nav = document.querySelector('header.header-area .main-nav .nav') || document.querySelector('.main-nav .nav');
    const body = document.body;

    console.log('Menu trigger found:', !!menuTrigger);
    console.log('Nav found:', !!nav);

    if (menuTrigger && nav) {
        // Force clickable
        menuTrigger.style.pointerEvents = 'auto';
        menuTrigger.style.cursor = 'pointer';
        menuTrigger.style.zIndex = '999999';
        
        // Remove any existing click handlers to avoid conflicts
        menuTrigger.onclick = null;
        
        // Core toggle logic
        const toggleMenu = function() {
            if (!menuTrigger || !nav) return;
            console.log('=== HAMBURGER CLICKED ===');
            console.log('Nav classes before:', nav.className);
            console.log('Menu trigger:', menuTrigger);
            console.log('Nav element:', nav);

            if (nav.classList.contains('mobile-active')) {
                console.log('CLOSING menu');
                nav.classList.remove('mobile-active');
                menuTrigger.classList.remove('active');
                body.classList.remove('menu-open');
                menuTrigger.setAttribute('aria-expanded', 'false');
            } else {
                console.log('OPENING menu');
                nav.classList.add('mobile-active');
                menuTrigger.classList.add('active');
                body.classList.add('menu-open');
                menuTrigger.setAttribute('aria-expanded', 'true');

                setTimeout(() => {
                    const computed = window.getComputedStyle(nav);
                    console.log('Menu open - right:', computed.right, '| display:', computed.display, '| visibility:', computed.visibility);
                }, 100);

                const firstLink = nav.querySelector('a');
                if (firstLink) {
                    firstLink.focus({ preventScroll: true });
                }
            }
            console.log('Nav classes after:', nav.className);
        };

        // Add click handler with multiple event types for compatibility
        const handleClick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        };
        
        // Add multiple event listeners for maximum compatibility
        menuTrigger.addEventListener('click', handleClick, true);
        menuTrigger.addEventListener('touchend', handleClick, true);
        
        // Also add to onclick as fallback
        menuTrigger.onclick = handleClick;
        
        // ARIA attributes
        menuTrigger.setAttribute('aria-controls', 'mobile-nav');
        menuTrigger.setAttribute('aria-expanded', 'false');
        if (!nav.id) {
            nav.id = 'mobile-nav';
        }

        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-active');
                menuTrigger.classList.remove('active');
                body.classList.remove('menu-open');
                menuTrigger.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside (on overlay)
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuTrigger.contains(e.target) && body.classList.contains('menu-open')) {
                nav.classList.remove('mobile-active');
                menuTrigger.classList.remove('active');
                body.classList.remove('menu-open');
                menuTrigger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                nav.classList.remove('mobile-active');
                menuTrigger.classList.remove('active');
                body.classList.remove('menu-open');
                menuTrigger.setAttribute('aria-expanded', 'false');
                menuTrigger.focus({ preventScroll: true });
            }
        });
        // Document-level delegation as a fallback (covers dynamic DOM or CSS overlays)
        document.addEventListener('click', function(evt) {
            const trigger = evt.target.closest('#mobile-menu-trigger, .menu-trigger');
            if (!trigger) return;
            // refresh references if DOM changed
            menuTrigger = trigger;
            nav = document.querySelector('header.header-area .main-nav .nav') || document.querySelector('.main-nav .nav');
            if (!nav) return;
            evt.preventDefault();
            evt.stopPropagation();
            // ensure attributes
            menuTrigger.setAttribute('aria-controls', nav.id || 'mobile-nav');
            if (!nav.id) nav.id = 'mobile-nav';
            // force clickable
            menuTrigger.style.pointerEvents = 'auto';
            menuTrigger.style.cursor = 'pointer';
            toggleMenu();
        }, true);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Improve touch interactions for cards
    const cards = document.querySelectorAll('.cbc-subject-card, .event-card, .newsletter-card, .stat-card, .activity-card, .admission-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Improve tab navigation for mobile
    const tabButtons = document.querySelectorAll('.cbc-tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add active state visual feedback
            tabButtons.forEach(btn => btn.classList.remove('active-tab'));
            this.classList.add('active-tab');
            
            // Scroll tab into view on mobile
            if (window.innerWidth <= 768) {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    });
    
    // Improve form interactions on mobile
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll input into view on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });
    
    // Prevent zoom on input focus for iOS
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Add swipe support for CBC program tabs
    let startX = 0;
    let currentTab = 0;
    const tabContainer = document.querySelector('.cbc-tabs-nav');
    const tabs = document.querySelectorAll('.cbc-tab-btn');
    
    if (tabContainer && tabs.length > 0) {
        tabContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });
        
        tabContainer.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Swipe left (next tab)
            if (diffX > 50 && currentTab < tabs.length - 1) {
                currentTab++;
                tabs[currentTab].click();
            }
            // Swipe right (previous tab)
            else if (diffX < -50 && currentTab > 0) {
                currentTab--;
                tabs[currentTab].click();
            }
        });
    }
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading placeholder
        if (!img.complete) {
            img.style.opacity = '0.5';
        }
    });
    
    // Add pull-to-refresh indicator (visual only)
    let startY = 0;
    let pullDistance = 0;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', function(e) {
        if (window.scrollY === 0) {
            pullDistance = e.touches[0].clientY - startY;
            if (pullDistance > 0) {
                document.body.style.transform = `translateY(${Math.min(pullDistance * 0.5, 50)}px)`;
            }
        }
    });
    
    document.addEventListener('touchend', function() {
        document.body.style.transform = '';
        pullDistance = 0;
    });
    
    // Improve button touch targets
    const buttons = document.querySelectorAll('button, .btn, .main-button-red a, .main-button-yellow a');
    buttons.forEach(button => {
        if (window.innerWidth <= 768) {
            const rect = button.getBoundingClientRect();
            if (rect.height < 44) {
                button.style.minHeight = '44px';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
            }
        }
    });
    
    // Add loading states for better UX
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = this.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.style.opacity = '0.7';
                submitBtn.style.pointerEvents = 'none';
            }
        });
    });
}

// Initialize ASAP even if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupMobileNav);
} else {
    setupMobileNav();
}

// Add CSS for mobile enhancements
const mobileStyles = `
    .active-tab {
        background-color: rgba(255,255,255,0.2) !important;
    }
    
    @media (max-width: 768px) {
        .cbc-tabs-nav {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        
        .cbc-tabs-nav::-webkit-scrollbar {
            display: none;
        }
        
        .cbc-tab-btn {
            flex-shrink: 0;
            min-width: 120px;
        }
        
        /* Improve touch targets */
        button, .btn, a {
            min-height: 44px;
            min-width: 44px;
        }
        
        /* Better form focus states */
        input:focus, textarea:focus {
            transform: scale(1.02);
            transition: transform 0.2s ease;
        }
        
        /* Loading states */
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Pull to refresh visual */
        body {
            transition: transform 0.3s ease;
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);
