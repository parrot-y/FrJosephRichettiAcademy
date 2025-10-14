/**
 * Mobile Enhancement JavaScript
 * Adds mobile-specific optimizations without changing existing functionality
 */

(function() {
  'use strict';

  // Initialize mobile enhancements when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileEnhancements);
  } else {
    initMobileEnhancements();
  }

  function initMobileEnhancements() {
    // Only run mobile enhancements on mobile devices
    if (isMobileDevice()) {
      setupTouchOptimizations();
      setupMobileNavigation();
      setupMobilePerformance();
      setupMobileAccessibility();
      setupMobileImages();
    }
    
    // Run on all devices
    setupResponsiveImages();
    setupLazyLoading();
    setupPerformanceOptimizations();
  }

  // ===== DEVICE DETECTION =====
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
  }

  // ===== TOUCH OPTIMIZATIONS =====
  function setupTouchOptimizations() {
    // Add touch feedback to buttons
    const touchElements = document.querySelectorAll('.main-button-red a, .main-button-yellow a, button, .btn');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });
      
      element.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });

    // Improve carousel touch experience
    const carousels = document.querySelectorAll('.owl-carousel');
    carousels.forEach(carousel => {
      carousel.style.touchAction = 'pan-y';
    });

    // Add touch feedback to cards
    const cards = document.querySelectorAll('.meeting-item, .meeting-single-item, .card');
    cards.forEach(card => {
      card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      }, { passive: true });
      
      card.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
    });
  }

  // ===== MOBILE NAVIGATION ENHANCEMENTS =====
  function setupMobileNavigation() {
    // Improve mobile menu behavior
    const menuTrigger = document.querySelector('.menu-trigger');
    const nav = document.querySelector('.main-nav .nav');
    
    if (menuTrigger && nav) {
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!menuTrigger.contains(e.target) && !nav.contains(e.target)) {
          nav.classList.remove('active');
        }
      });

      // Close menu when clicking on a link
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          nav.classList.remove('active');
        });
      });
    }

    // Improve scroll behavior for mobile
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header-area');
    
    if (header) {
      window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      }, { passive: true });
    }
  }

  // ===== MOBILE PERFORMANCE =====
  function setupMobilePerformance() {
    // Disable autoplay videos on mobile to save bandwidth
    const videos = document.querySelectorAll('video[autoplay]');
    videos.forEach(video => {
      if (isMobileDevice()) {
        video.removeAttribute('autoplay');
        video.muted = true;
        
        // Add play button overlay
        const playButton = document.createElement('button');
        playButton.innerHTML = '▶️ Play Video';
        playButton.className = 'video-play-button';
        playButton.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 188, 212, 0.9);
          color: white;
          border: none;
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          z-index: 10;
        `;
        
        video.parentElement.style.position = 'relative';
        video.parentElement.appendChild(playButton);
        
        playButton.addEventListener('click', function() {
          video.play();
          playButton.style.display = 'none';
        });
      }
    });

    // Optimize carousel autoplay for mobile
    const carousels = document.querySelectorAll('.owl-carousel');
    carousels.forEach(carousel => {
      if (window.jQuery && jQuery(carousel).data('owl.carousel')) {
        const owl = jQuery(carousel).data('owl.carousel');
        
        // Pause autoplay when page is not visible
        document.addEventListener('visibilitychange', function() {
          if (document.hidden) {
            owl.stop();
          } else {
            owl.play();
          }
        });
      }
    });
  }

  // ===== MOBILE ACCESSIBILITY =====
  function setupMobileAccessibility() {
    // Improve focus management for mobile
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
      element.addEventListener('focus', function() {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Add skip links for mobile
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Skip to main content';
      skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #00BCD4;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
      `;
      
      skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
      });
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
  }

  // ===== MOBILE IMAGE OPTIMIZATIONS =====
  function setupMobileImages() {
    // Add loading states for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
          this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
          this.style.opacity = '1';
          this.alt = 'Image could not be loaded';
        });
      }
    });
  }

  // ===== RESPONSIVE IMAGES =====
  function setupResponsiveImages() {
    // Add responsive behavior to images without srcset
    const images = document.querySelectorAll('img:not([srcset])');
    
    images.forEach(img => {
      // Add loading="lazy" for better performance
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy';
      }
      
      // Ensure images are responsive
      if (!img.style.maxWidth) {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
    });
  }

  // ===== LAZY LOADING =====
  function setupLazyLoading() {
    // Enhanced lazy loading for older browsers
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      function loadImage(img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      
      function handleScroll() {
        lazyImages.forEach(img => {
          if (img.getBoundingClientRect().top < window.innerHeight + 100) {
            loadImage(img);
          }
        });
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Check initial viewport
    }
  }

  // ===== PERFORMANCE OPTIMIZATIONS =====
  function setupPerformanceOptimizations() {
    // Optimize scroll events
    let ticking = false;
    
    function optimizedScrollHandler() {
      if (!ticking) {
        requestAnimationFrame(function() {
          // Scroll-dependent operations here
          ticking = false;
        });
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

    // Preload critical resources
    const criticalResources = [
      '/assets/css/templatemo-edu-meeting.css',
      '/assets/images/fr joseph logo_page-0001.jpg'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.css') ? 'style' : 'image';
      document.head.appendChild(link);
    });

    // Optimize font loading
    if ('fonts' in document) {
      document.fonts.ready.then(function() {
        document.body.classList.add('fonts-loaded');
      });
    }

    // Add connection hints for external resources
    const domains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = '//' + domain;
      document.head.appendChild(link);
    });
  }

  // ===== FORM ENHANCEMENTS =====
  function setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        // Prevent zoom on iOS
        if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
          input.style.fontSize = '16px';
        }
        
        // Add better focus styles
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
        });
      });
    });
  }

  // ===== ORIENTATION CHANGE HANDLING =====
  function setupOrientationHandling() {
    window.addEventListener('orientationchange', function() {
      // Delay to ensure viewport has updated
      setTimeout(function() {
        // Refresh any layout-dependent components
        const carousels = document.querySelectorAll('.owl-carousel');
        carousels.forEach(carousel => {
          if (window.jQuery && jQuery(carousel).data('owl.carousel')) {
            jQuery(carousel).trigger('refresh.owl.carousel');
          }
        });
        
        // Recalculate any fixed positions
        const stickyElements = document.querySelectorAll('.header-sticky');
        stickyElements.forEach(element => {
          element.style.transform = 'translateY(0)';
        });
      }, 500);
    });
  }

  // ===== NETWORK AWARENESS =====
  function setupNetworkAwareness() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      function handleConnectionChange() {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          // Disable autoplay and reduce animations on slow connections
          document.body.classList.add('slow-connection');
          
          const videos = document.querySelectorAll('video[autoplay]');
          videos.forEach(video => {
            video.pause();
            video.removeAttribute('autoplay');
          });
        } else {
          document.body.classList.remove('slow-connection');
        }
      }
      
      connection.addEventListener('change', handleConnectionChange);
      handleConnectionChange(); // Check initial connection
    }
  }

  // ===== ERROR HANDLING =====
  function setupErrorHandling() {
    // Handle image loading errors
    document.addEventListener('error', function(e) {
      if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Image failed to load:', e.target.src);
      }
    }, true);

    // Handle script loading errors
    window.addEventListener('error', function(e) {
      console.error('Script error:', e.error);
    });
  }

  // Initialize all enhancements
  setupFormEnhancements();
  setupOrientationHandling();
  setupNetworkAwareness();
  setupErrorHandling();

})();
