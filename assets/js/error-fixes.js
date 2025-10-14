/**
 * Error Fixes and Smooth Operation Script
 * Ensures all pages and buttons work without errors
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initErrorFixes);
    } else {
        initErrorFixes();
    }

    function initErrorFixes() {
        fixLogoPositioning();
        fixNavigationErrors();
        fixButtonErrors();
        fixFormErrors();
        fixCarouselErrors();
        fixImageErrors();
        fixScrollErrors();
        fixMobileErrors();
        setupErrorHandling();
        improveUserExperience();
    }

    // ===== LOGO POSITIONING FIXES =====
    function fixLogoPositioning() {
        const logo = document.querySelector('.header-area .main-nav .logo');
        const header = document.querySelector('.header-area');
        
        if (logo && header) {
            // Ensure logo doesn't block content
            const logoHeight = logo.offsetHeight;
            const headerHeight = header.offsetHeight;
            
            // Add proper spacing to prevent content overlap
            const mainBanner = document.querySelector('.main-banner, .heading-page');
            if (mainBanner) {
                const currentPaddingTop = parseInt(window.getComputedStyle(mainBanner).paddingTop) || 0;
                if (currentPaddingTop < headerHeight + 20) {
                    mainBanner.style.paddingTop = (headerHeight + 20) + 'px';
                }
            }

            // Fix logo click functionality
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });

            // Ensure logo is always visible
            logo.style.zIndex = '1000';
            logo.style.position = 'relative';
        }
    }

    // ===== NAVIGATION ERROR FIXES =====
    function fixNavigationErrors() {
        // Fix menu trigger functionality
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.main-nav .nav');
        
        if (menuTrigger && nav) {
            menuTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                nav.classList.toggle('active');
                menuTrigger.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuTrigger.contains(e.target) && !nav.contains(e.target)) {
                    nav.classList.remove('active');
                    menuTrigger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Fix navigation links
        const navLinks = document.querySelectorAll('.main-nav .nav a, .scroll-to-section a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        const headerHeight = document.querySelector('.header-area').offsetHeight || 80;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Close mobile menu if open
                        if (nav) {
                            nav.classList.remove('active');
                            if (menuTrigger) menuTrigger.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                }
            });
        });

        // Fix submenu functionality
        const hasSubMenus = document.querySelectorAll('.has-sub');
        hasSubMenus.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (link && submenu) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    submenu.classList.toggle('active');
                });
            }
        });
    }

    // ===== BUTTON ERROR FIXES =====
    function fixButtonErrors() {
        // Fix all buttons to prevent default errors
        const buttons = document.querySelectorAll('button, .btn, .main-button-red a, .main-button-yellow a');
        
        buttons.forEach(button => {
            // Ensure buttons are clickable
            button.style.cursor = 'pointer';
            button.style.userSelect = 'none';
            
            // Add click feedback
            button.addEventListener('click', function(e) {
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Handle form submissions
                if (this.type === 'submit' || this.closest('form')) {
                    const form = this.closest('form');
                    if (form && !form.checkValidity()) {
                        e.preventDefault();
                        showFormErrors(form);
                    }
                }
            });

            // Fix disabled state
            if (button.disabled) {
                button.style.opacity = '0.6';
                button.style.pointerEvents = 'none';
            }
        });

        // Fix scroll-to-section buttons
        const scrollButtons = document.querySelectorAll('.scroll-to-section a');
        scrollButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    smoothScrollTo(href);
                }
            });
        });
    }

    // ===== FORM ERROR FIXES =====
    function fixFormErrors() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Add form validation
            form.addEventListener('submit', function(e) {
                if (!validateForm(this)) {
                    e.preventDefault();
                    showFormErrors(this);
                }
            });

            // Fix input focus issues
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                // Prevent iOS zoom
                if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
                    input.style.fontSize = '16px';
                }

                // Add validation feedback
                input.addEventListener('blur', function() {
                    validateField(this);
                });

                input.addEventListener('input', function() {
                    clearFieldError(this);
                });
            });
        });
    }

    // ===== CAROUSEL ERROR FIXES =====
    function fixCarouselErrors() {
        // Wait for Owl Carousel to be available
        const checkOwlCarousel = setInterval(() => {
            if (window.jQuery && jQuery.fn.owlCarousel) {
                clearInterval(checkOwlCarousel);
                initializeCarousels();
            }
        }, 100);

        function initializeCarousels() {
            // Fix main carousels
            const carousels = document.querySelectorAll('.owl-carousel');
            carousels.forEach(carousel => {
                try {
                    const $carousel = jQuery(carousel);
                    
                    // Destroy existing carousel if it exists
                    if ($carousel.data('owl.carousel')) {
                        $carousel.trigger('destroy.owl.carousel');
                    }

                    // Reinitialize with error handling
                    if (carousel.classList.contains('activity-images')) {
                        $carousel.owlCarousel({
                            items: 1,
                            loop: true,
                            autoplay: true,
                            autoplayTimeout: 3000,
                            autoplayHoverPause: true,
                            nav: false,
                            dots: false,
                            animateOut: 'fadeOut',
                            animateIn: 'fadeIn',
                            responsive: {
                                0: { items: 1 },
                                600: { items: 1 },
                                1000: { items: 1 }
                            }
                        });
                    } else {
                        // Default carousel settings
                        $carousel.owlCarousel({
                            loop: true,
                            margin: 30,
                            nav: true,
                            dots: false,
                            autoplay: true,
                            autoplayTimeout: 5000,
                            responsive: {
                                0: { items: 1 },
                                600: { items: 2 },
                                1000: { items: 3 }
                            }
                        });
                    }
                } catch (error) {
                    console.warn('Carousel initialization error:', error);
                }
            });
        }
    }

    // ===== IMAGE ERROR FIXES =====
    function fixImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Handle image loading errors
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Image failed to load:', this.src);
            });

            // Add loading state
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
            }

            // Ensure images are responsive
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });
    }

    // ===== SCROLL ERROR FIXES =====
    function fixScrollErrors() {
        // Fix smooth scrolling
        window.smoothScrollTo = function(target) {
            const element = document.querySelector(target);
            if (element) {
                const headerHeight = document.querySelector('.header-area').offsetHeight || 80;
                const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        };

        // Fix scroll-based animations
        let ticking = false;
        function updateScrollAnimations() {
            // Add scroll-based functionality here
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== MOBILE ERROR FIXES =====
    function fixMobileErrors() {
        if (window.innerWidth <= 768) {
            // Fix mobile navigation
            const header = document.querySelector('.header-area');
            if (header) {
                header.style.position = 'fixed';
                header.style.top = '0';
                header.style.left = '0';
                header.style.right = '0';
                header.style.zIndex = '999';
            }

            // Fix mobile touch events
            document.addEventListener('touchstart', function() {}, { passive: true });
            
            // Fix viewport issues
            const viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
            }
        }
    }

    // ===== ERROR HANDLING SETUP =====
    function setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // Don't show errors to users, just log them
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
            e.preventDefault(); // Prevent error from showing in console
        });

        // Handle jQuery errors if jQuery is available
        if (window.jQuery) {
            jQuery(document).ajaxError(function(event, xhr, settings, error) {
                console.error('AJAX error:', error);
            });
        }
    }

    // ===== USER EXPERIENCE IMPROVEMENTS =====
    function improveUserExperience() {
        // Add loading states
        document.body.classList.add('loaded');

        // Improve button feedback
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(element => {
            element.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Add focus indicators
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });

        // Improve form UX
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // ===== UTILITY FUNCTIONS =====
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showFieldError(input, 'This field is required');
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                isValid = false;
                showFieldError(input, 'Please enter a valid email address');
            }
        });
        
        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        
        if (field.required && !value) {
            showFieldError(field, 'This field is required');
            return false;
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        } else {
            clearFieldError(field);
            return true;
        }
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = 'color: #ff4444; font-size: 12px; margin-top: 5px;';
            field.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function showFormErrors(form) {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

})();
