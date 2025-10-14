/**
 * Smooth Scroll Fix - Professional scrolling experience
 * Eliminates flickering and provides buttery smooth scrolling
 */

(function() {
    'use strict';

    let isScrolling = false;
    let scrollTimer = null;
    let ticking = false;

    // Initialize smooth scrolling
    function initSmoothScrolling() {
        // Add smooth scrolling class to body
        document.body.classList.add('smooth-scrolling');
        
        // Setup smooth anchor scrolling
        setupSmoothAnchorScrolling();
        
        // Setup optimized scroll handling
        setupOptimizedScrollHandling();
        
        // Setup header behavior
        setupSmoothHeaderBehavior();
        
        // Setup intersection observer for animations
        setupSmoothAnimations();
        
        // Prevent scroll flickering
        preventScrollFlickering();
        
        // Setup mobile optimizations
        setupMobileScrollOptimizations();
    }

    // ===== SMOOTH ANCHOR SCROLLING =====
    function setupSmoothAnchorScrolling() {
        // Override all anchor link behavior
        document.addEventListener('click', function(e) {
            const target = e.target.closest('a[href^="#"]');
            if (!target) return;

            const href = target.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            // Calculate scroll position
            const headerHeight = getHeaderHeight();
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            // Smooth scroll to target
            smoothScrollTo(targetPosition, 800);
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        });
    }

    // ===== OPTIMIZED SCROLL HANDLING =====
    function setupOptimizedScrollHandling() {
        let lastScrollY = window.pageYOffset;
        let scrollDirection = 'up';
        
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const currentScrollY = window.pageYOffset;
                    scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                    
                    // Update scroll-based elements
                    updateScrollElements(currentScrollY, scrollDirection);
                    
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Use passive listeners for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Handle scroll start/end
        window.addEventListener('scroll', function() {
            isScrolling = true;
            document.body.classList.add('is-scrolling');
            
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function() {
                isScrolling = false;
                document.body.classList.remove('is-scrolling');
            }, 150);
        }, { passive: true });
    }

    // ===== SMOOTH HEADER BEHAVIOR =====
    function setupSmoothHeaderBehavior() {
        const header = document.querySelector('.header-area');
        if (!header) return;

        let lastScrollY = window.pageYOffset;
        let headerVisible = true;

        function updateHeader(scrollY, direction) {
            const scrollThreshold = 100;
            
            // Show/hide header based on scroll direction
            if (scrollY > scrollThreshold) {
                if (direction === 'down' && headerVisible) {
                    // Hide header when scrolling down
                    header.style.transform = 'translateY(-100%)';
                    headerVisible = false;
                } else if (direction === 'up' && !headerVisible) {
                    // Show header when scrolling up
                    header.style.transform = 'translateY(0)';
                    headerVisible = true;
                }
            } else {
                // Always show header at top of page
                if (!headerVisible) {
                    header.style.transform = 'translateY(0)';
                    headerVisible = true;
                }
            }

            // Add background when scrolled
            if (scrollY > 50) {
                header.classList.add('background-header');
            } else {
                header.classList.remove('background-header');
            }
        }

        // Update header on scroll
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const currentScrollY = window.pageYOffset;
                    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
                    
                    updateHeader(currentScrollY, direction);
                    
                    lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== SMOOTH ANIMATIONS =====
    function setupSmoothAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class
        const animatedElements = document.querySelectorAll('.fade-in, .meeting-item, .meeting-single-item');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ===== PREVENT SCROLL FLICKERING =====
    function preventScrollFlickering() {
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Recalculate positions after resize
                updateScrollElements(window.pageYOffset, 'up');
            }, 250);
        });

        // Prevent flickering during orientation change
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                // Force repaint after orientation change
                document.body.style.transform = 'translateZ(0)';
                setTimeout(function() {
                    document.body.style.transform = '';
                }, 100);
            }, 500);
        });

        // Optimize carousel performance
        const carousels = document.querySelectorAll('.owl-carousel');
        carousels.forEach(carousel => {
            carousel.addEventListener('translate.owl.carousel', function() {
                // Force GPU acceleration during carousel transitions
                carousel.style.transform = 'translateZ(0)';
            });
        });
    }

    // ===== MOBILE SCROLL OPTIMIZATIONS =====
    function setupMobileScrollOptimizations() {
        if (!isMobileDevice()) return;

        // Optimize touch scrolling
        document.addEventListener('touchstart', function() {
            // Enable momentum scrolling
            document.body.style.webkitOverflowScrolling = 'touch';
        }, { passive: true });

        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    transition-duration: 0.2s !important;
                }
                .owl-carousel .owl-item {
                    transition-duration: 0.3s !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Pause animations during scroll on mobile
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            document.body.classList.add('mobile-scrolling');
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                document.body.classList.remove('mobile-scrolling');
            }, 150);
        }, { passive: true });
    }

    // ===== UTILITY FUNCTIONS =====
    function smoothScrollTo(targetPosition, duration = 800) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function scrollAnimation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            const currentPosition = startPosition + (distance * easeInOutCubic);
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    }

    function getHeaderHeight() {
        const header = document.querySelector('.header-area');
        return header ? header.offsetHeight : 80;
    }

    function updateScrollElements(scrollY, direction) {
        // Update any scroll-dependent elements here
        // This function is called optimally during scroll
    }

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    function optimizePerformance() {
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[data-critical]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src || img.dataset.src;
            document.head.appendChild(link);
        });

        // Optimize font loading
        if ('fonts' in document) {
            document.fonts.ready.then(function() {
                document.body.classList.add('fonts-loaded');
            });
        }

        // Enable GPU acceleration for key elements
        const gpuElements = document.querySelectorAll('.header-area, .main-banner, .owl-carousel');
        gpuElements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            element.style.willChange = 'transform';
        });
    }

    // ===== SMOOTH PAGE TRANSITIONS =====
    function setupPageTransitions() {
        // Add smooth transitions between pages
        const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.hostname === window.location.hostname) {
                    // Add loading state for internal links
                    document.body.classList.add('page-transitioning');
                    
                    // Remove loading state after navigation
                    setTimeout(() => {
                        document.body.classList.remove('page-transitioning');
                    }, 500);
                }
            });
        });
    }

    // ===== INITIALIZE =====
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(initSmoothScrolling, 100);
                optimizePerformance();
                setupPageTransitions();
            });
        } else {
            setTimeout(initSmoothScrolling, 100);
            optimizePerformance();
            setupPageTransitions();
        }

        // Mark page as loaded for CSS transitions
        window.addEventListener('load', function() {
            document.body.classList.add('loaded');
            document.body.classList.remove('loading');
        });
    }

    // Start initialization
    init();

    // Export for debugging
    window.smoothScrollFix = {
        smoothScrollTo,
        getHeaderHeight,
        init: initSmoothScrolling
    };

})();
