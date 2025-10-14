/**
 * Modern Framework JavaScript
 * Handles navigation, animations, performance, and accessibility
 */

class ModernFramework {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupFramework());
    } else {
      this.setupFramework();
    }
  }

  setupFramework() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupLazyLoading();
    this.setupAnimations();
    this.setupAccessibility();
    this.setupPerformanceOptimizations();
    this.setupUserFeedback();
    this.setupErrorHandling();
  }

  // ===== NAVIGATION SYSTEM =====
  setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.navbar-nav a, .mobile-nav-list a');

    if (!navbar) return;

    // Sticky navigation with hide/show on scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class for styling
      if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Mobile menu toggle
    if (mobileToggle && mobileNav) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        
        // Update ARIA attributes
        const isExpanded = mobileNav.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
        mobileNav.setAttribute('aria-hidden', !isExpanded);
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
          mobileToggle.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileNav.setAttribute('aria-hidden', 'true');
        }
      });
    }

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            if (mobileNav && mobileNav.classList.contains('active')) {
              mobileToggle.classList.remove('active');
              mobileNav.classList.remove('active');
              document.body.style.overflow = '';
            }

            // Update active link
            this.updateActiveNavLink(href);
          }
        }
      });
    });

    // Update active navigation link based on scroll position
    this.setupActiveNavigation();
  }

  setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"], .mobile-nav-list a[href^="#"]');

    if (sections.length === 0) return;

    const updateActiveLink = () => {
      let currentSection = '';
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    };

    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveLink);
        ticking = true;
      }
    };

    window.addEventListener('scroll', () => {
      ticking = false;
      requestTick();
    }, { passive: true });
  }

  updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.navbar-nav a, .mobile-nav-list a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === href) {
        link.classList.add('active');
      }
    });
  }

  // ===== SCROLL EFFECTS =====
  setupScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animation delay for multiple elements
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      });
    }, observerOptions);

    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Parallax effect for hero sections
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length > 0) {
      let ticking = false;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const rate = scrolled * -0.5;
          element.style.transform = `translateY(${rate}px)`;
        });
        
        ticking = false;
      };

      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      };

      window.addEventListener('scroll', requestTick, { passive: true });
    }
  }

  // ===== LAZY LOADING =====
  setupLazyLoading() {
    // Native lazy loading fallback with Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src], img.lazy-image');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading support
      lazyImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.loading = 'lazy';
      });
    } else {
      // Fallback with Intersection Observer
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Preload critical images
    this.preloadCriticalImages();
  }

  preloadCriticalImages() {
    const criticalImages = [
      'assets/images/fr joseph logo_page-0001.jpg',
      // Add other critical images here
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // ===== ANIMATIONS =====
  setupAnimations() {
    // Add entrance animations to cards and sections
    const animatedElements = document.querySelectorAll('.card, .section-header, .btn');
    
    animatedElements.forEach(element => {
      if (!element.classList.contains('fade-in')) {
        element.classList.add('fade-in');
      }
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation CSS
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ===== ACCESSIBILITY =====
  setupAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Escape key closes mobile menu
      if (e.key === 'Escape') {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileToggle.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.style.overflow = '';
          mobileToggle.focus();
        }
      }
    });

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) {
      const skip = document.createElement('a');
      skip.href = '#main-content';
      skip.className = 'skip-link';
      skip.textContent = 'Skip to main content';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    // Add ARIA labels and roles
    this.enhanceAccessibility();

    // Focus management for modals and dropdowns
    this.setupFocusManagement();

    // Announce dynamic content changes to screen readers
    this.setupAriaLiveRegions();
  }

  enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });

    // Add roles to navigation
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Main navigation');
    }

    // Add landmarks
    const main = document.querySelector('main');
    if (!main) {
      const mainContent = document.querySelector('#main-content') || document.querySelector('.main-content');
      if (mainContent) {
        mainContent.setAttribute('role', 'main');
      }
    }
  }

  setupFocusManagement() {
    // Trap focus in mobile menu when open
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
      const focusableElements = mobileNav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        mobileNav.addEventListener('keydown', (e) => {
          if (e.key === 'Tab' && mobileNav.classList.contains('active')) {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        });
      }
    }
  }

  setupAriaLiveRegions() {
    // Create live region for announcements
    if (!document.querySelector('#aria-live-region')) {
      const liveRegion = document.createElement('div');
      liveRegion.id = 'aria-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
  }

  announceToScreenReader(message) {
    const liveRegion = document.querySelector('#aria-live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====
  setupPerformanceOptimizations() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });

    // Optimize scroll events with throttling
    this.setupScrollThrottling();

    // Preload next page resources
    this.setupResourcePreloading();

    // Service worker for caching (if supported)
    this.setupServiceWorker();
  }

  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      const mobileNav = document.querySelector('.mobile-nav');
      
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  }

  setupScrollThrottling() {
    let scrollTimeout;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          // Scroll-dependent operations here
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }

  setupResourcePreloading() {
    // Preload resources on hover
    document.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      }, { once: true });
    });
  }

  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // ===== USER FEEDBACK =====
  setupUserFeedback() {
    // Loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        if (!button.classList.contains('loading')) {
          this.showButtonLoading(button);
        }
      });
    });

    // Form validation feedback
    this.setupFormFeedback();

    // Toast notifications system
    this.setupToastSystem();
  }

  showButtonLoading(button) {
    const originalText = button.textContent;
    button.classList.add('loading');
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Loading...';

    // Add loading spinner styles
    if (!document.querySelector('#loading-styles')) {
      const style = document.createElement('style');
      style.id = 'loading-styles';
      style.textContent = `
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Reset after 3 seconds (adjust based on your needs)
    setTimeout(() => {
      button.classList.remove('loading');
      button.disabled = false;
      button.textContent = originalText;
    }, 3000);
  }

  setupFormFeedback() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });

        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            this.validateField(input);
          }
        });
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Basic validation rules
    if (field.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    this.showFieldFeedback(field, isValid, errorMessage);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldFeedback(field, isValid, message) {
    field.classList.toggle('error', !isValid);
    field.classList.toggle('valid', isValid);

    // Remove existing feedback
    const existingFeedback = field.parentNode.querySelector('.field-feedback');
    if (existingFeedback) {
      existingFeedback.remove();
    }

    // Add new feedback if there's an error
    if (!isValid && message) {
      const feedback = document.createElement('div');
      feedback.className = 'field-feedback error';
      feedback.textContent = message;
      feedback.setAttribute('role', 'alert');
      field.parentNode.appendChild(feedback);
    }
  }

  setupToastSystem() {
    // Create toast container
    if (!document.querySelector('#toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1080;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
  }

  showToast(message, type = 'info', duration = 5000) {
    const container = document.querySelector('#toast-container');
    const toast = document.createElement('div');
    
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
      background: var(--white);
      color: var(--gray-800);
      padding: 16px 20px;
      margin-bottom: 10px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      border-left: 4px solid var(--${type === 'error' ? 'error' : type === 'success' ? 'success' : 'primary'}-color);
      pointer-events: auto;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    
    toast.textContent = message;
    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
    });

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    });
  }

  // ===== ERROR HANDLING =====
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.showToast('Something went wrong. Please try again.', 'error');
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      this.showToast('An error occurred. Please refresh the page.', 'error');
    });

    // Network error detection
    window.addEventListener('online', () => {
      this.showToast('Connection restored', 'success');
    });

    window.addEventListener('offline', () => {
      this.showToast('No internet connection', 'error');
    });
  }

  // ===== PUBLIC METHODS =====
  
  // Method to manually trigger animations
  animateElement(element, animationClass = 'animate-fade-in-up') {
    element.classList.add(animationClass);
  }

  // Method to show loading state
  showLoading(element) {
    element.classList.add('loading');
  }

  hideLoading(element) {
    element.classList.remove('loading');
  }

  // Method to update page content dynamically
  updateContent(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = content;
      this.announceToScreenReader('Content updated');
    }
  }
}

// Initialize the framework
const modernFramework = new ModernFramework();

// Export for use in other scripts
window.ModernFramework = modernFramework;
