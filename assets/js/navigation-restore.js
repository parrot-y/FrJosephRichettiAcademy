/**
 * Navigation Restoration Script
 * Restores original navigation functionality while keeping improvements
 */

(function() {
    'use strict';

    // Initialize navigation restoration
    function initNavigationRestore() {
        setupMobileMenu();
        setupScrollToSection();
        setupActiveLinks();
        setupSubmenuBehavior();
        setupNavigationAccessibility();
    }

    // ===== MOBILE MENU FUNCTIONALITY =====
    function setupMobileMenu() {
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.main-nav .nav');
        
        if (!menuTrigger || !nav) return;

        // Mobile menu toggle
        menuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            nav.classList.toggle('active');
            menuTrigger.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = nav.classList.contains('active');
            menuTrigger.setAttribute('aria-expanded', isExpanded);
            nav.setAttribute('aria-hidden', !isExpanded);
            
            // Prevent body scroll when menu is open
            if (isExpanded) {
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
                menuTrigger.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
                menuTrigger.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 767) {
                nav.classList.remove('active');
                menuTrigger.classList.remove('active');
                menuTrigger.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== SCROLL TO SECTION FUNCTIONALITY =====
    function setupScrollToSection() {
        const scrollLinks = document.querySelectorAll('.scroll-to-section a');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const headerHeight = getHeaderHeight();
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        // Smooth scroll to target
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });

                        // Update active link
                        updateActiveLink(this);
                        
                        // Update URL
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });
    }

    // ===== ACTIVE LINK MANAGEMENT =====
    function setupActiveLinks() {
        const sections = document.querySelectorAll('.section[data-section]');
        const navLinks = document.querySelectorAll('.main-nav .nav a[href^="#"]');
        
        if (sections.length === 0) return;

        // Update active link based on scroll position
        function updateActiveOnScroll() {
            const scrollPosition = window.pageYOffset + getHeaderHeight() + 50;
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('data-section');
                }
            });
            
            // Update navigation links
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const sectionId = href ? href.replace('#', '') : '';
                
                if (sectionId === currentSection) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateActiveOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateActiveOnScroll();
    }

    // ===== SUBMENU BEHAVIOR =====
    function setupSubmenuBehavior() {
        const hasSubItems = document.querySelectorAll('.has-sub');
        
        hasSubItems.forEach(item => {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');
            
            if (!link || !submenu) return;

            // Handle submenu clicks
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href') === 'javascript:void(0)') {
                    e.preventDefault();
                    
                    // Toggle submenu on mobile
                    if (window.innerWidth <= 767) {
                        submenu.classList.toggle('active');
                        
                        // Update ARIA attributes
                        const isExpanded = submenu.classList.contains('active');
                        this.setAttribute('aria-expanded', isExpanded);
                    }
                }
            });

            // Handle keyboard navigation
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (this.getAttribute('href') === 'javascript:void(0)') {
                        e.preventDefault();
                        submenu.classList.toggle('active');
                        
                        const isExpanded = submenu.classList.contains('active');
                        this.setAttribute('aria-expanded', isExpanded);
                    }
                }
            });

            // Handle submenu link clicks
            const submenuLinks = submenu.querySelectorAll('a');
            submenuLinks.forEach(submenuLink => {
                submenuLink.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            const headerHeight = getHeaderHeight();
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                            
                            // Close mobile menu if open
                            const nav = document.querySelector('.main-nav .nav');
                            const menuTrigger = document.querySelector('.menu-trigger');
                            
                            if (nav && nav.classList.contains('active')) {
                                nav.classList.remove('active');
                                if (menuTrigger) {
                                    menuTrigger.classList.remove('active');
                                    menuTrigger.setAttribute('aria-expanded', 'false');
                                }
                                document.body.style.overflow = '';
                            }
                        }
                    }
                });
            });
        });
    }

    // ===== NAVIGATION ACCESSIBILITY =====
    function setupNavigationAccessibility() {
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.main-nav .nav');
        
        if (menuTrigger && nav) {
            // Set initial ARIA attributes
            menuTrigger.setAttribute('aria-expanded', 'false');
            menuTrigger.setAttribute('aria-controls', 'main-navigation');
            menuTrigger.setAttribute('aria-label', 'Toggle navigation menu');
            
            nav.setAttribute('id', 'main-navigation');
            nav.setAttribute('aria-hidden', 'true');
        }

        // Add ARIA attributes to submenu triggers
        const hasSubItems = document.querySelectorAll('.has-sub > a');
        hasSubItems.forEach(link => {
            if (link.getAttribute('href') === 'javascript:void(0)') {
                link.setAttribute('aria-expanded', 'false');
                link.setAttribute('aria-haspopup', 'true');
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close mobile menu on Escape
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    if (menuTrigger) {
                        menuTrigger.classList.remove('active');
                        menuTrigger.setAttribute('aria-expanded', 'false');
                        menuTrigger.focus();
                    }
                    nav.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // ===== UTILITY FUNCTIONS =====
    function updateActiveLink(clickedLink) {
        const navLinks = document.querySelectorAll('.main-nav .nav a');
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    function getHeaderHeight() {
        const header = document.querySelector('.header-area');
        return header ? header.offsetHeight : 80;
    }

    // ===== HEADER BACKGROUND BEHAVIOR =====
    function setupHeaderBackground() {
        const header = document.querySelector('.header-area');
        if (!header) return;

        function updateHeaderBackground() {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 50) {
                header.classList.add('background-header');
            } else {
                header.classList.remove('background-header');
            }
        }

        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateHeaderBackground();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateHeaderBackground();
    }

    // ===== INITIALIZE =====
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initNavigationRestore();
                setupHeaderBackground();
            });
        } else {
            initNavigationRestore();
            setupHeaderBackground();
        }
    }

    // Start initialization
    init();

    // Export for debugging
    window.navigationRestore = {
        init: initNavigationRestore,
        updateActiveLink,
        getHeaderHeight
    };

})();
