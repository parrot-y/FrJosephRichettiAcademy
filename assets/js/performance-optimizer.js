/**
 * Performance Optimization Module
 * Handles image optimization, lazy loading, and performance monitoring
 */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupImageOptimization();
    this.setupLazyLoading();
    this.setupResourceHints();
    this.setupPerformanceMonitoring();
    this.setupCriticalResourceLoading();
  }

  // ===== IMAGE OPTIMIZATION =====
  setupImageOptimization() {
    // Convert images to WebP format when supported
    if (this.supportsWebP()) {
      this.convertToWebP();
    }

    // Implement responsive images
    this.setupResponsiveImages();

    // Compress images on the fly
    this.setupImageCompression();
  }

  supportsWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  async convertToWebP() {
    const images = document.querySelectorAll('img[src$=".jpg"], img[src$=".png"], img[src$=".jpeg"]');
    
    for (const img of images) {
      const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      // Check if WebP version exists
      try {
        const response = await fetch(webpSrc, { method: 'HEAD' });
        if (response.ok) {
          img.src = webpSrc;
        }
      } catch (error) {
        // WebP version doesn't exist, keep original
      }
    }
  }

  setupResponsiveImages() {
    const images = document.querySelectorAll('img:not([srcset])');
    
    images.forEach(img => {
      const src = img.src;
      if (!src) return;

      // Generate responsive image sources
      const baseName = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      const extension = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';

      const srcset = [
        `${baseName}-400w${extension} 400w`,
        `${baseName}-800w${extension} 800w`,
        `${baseName}-1200w${extension} 1200w`,
        `${src} 1600w`
      ].join(', ');

      const sizes = '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px';

      img.srcset = srcset;
      img.sizes = sizes;
    });
  }

  setupImageCompression() {
    // Implement client-side image compression for uploads
    const fileInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
    
    fileInputs.forEach(input => {
      input.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        const compressedFiles = await Promise.all(files.map(file => this.compressImage(file)));
        
        // Replace original files with compressed versions
        const dt = new DataTransfer();
        compressedFiles.forEach(file => dt.items.add(file));
        input.files = dt.files;
      });
    });
  }

  async compressImage(file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(compressedFile);
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  }

  // ===== LAZY LOADING =====
  setupLazyLoading() {
    // Enhanced lazy loading with Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src], iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            this.loadElement(element);
            imageObserver.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      lazyImages.forEach(img => this.loadElement(img));
    }

    // Lazy load background images
    this.setupLazyBackgrounds();
  }

  loadElement(element) {
    if (element.dataset.src) {
      element.src = element.dataset.src;
      element.removeAttribute('data-src');
    }

    if (element.dataset.srcset) {
      element.srcset = element.dataset.srcset;
      element.removeAttribute('data-srcset');
    }

    element.classList.add('loaded');
  }

  setupLazyBackgrounds() {
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    
    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.backgroundImage = `url(${element.dataset.bg})`;
          element.removeAttribute('data-bg');
          element.classList.add('bg-loaded');
          bgObserver.unobserve(element);
        }
      });
    });

    lazyBackgrounds.forEach(bg => bgObserver.observe(bg));
  }

  // ===== RESOURCE HINTS =====
  setupResourceHints() {
    // Preload critical resources
    this.preloadCriticalResources();

    // Prefetch next page resources on hover
    this.setupPrefetchOnHover();

    // DNS prefetch for external domains
    this.setupDNSPrefetch();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { href: '/assets/css/modern-framework.css', as: 'style' },
      { href: '/assets/js/modern-framework.js', as: 'script' },
      { href: '/assets/images/fr joseph logo_page-0001.jpg', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      document.head.appendChild(link);
    });
  }

  setupPrefetchOnHover() {
    const links = document.querySelectorAll('a[href]');
    const prefetched = new Set();

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.href;
        
        if (!prefetched.has(href) && this.isInternalLink(href)) {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
          prefetched.add(href);
        }
      }, { once: true });
    });
  }

  setupDNSPrefetch() {
    const externalDomains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdnjs.cloudflare.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  }

  isInternalLink(href) {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin;
    } catch {
      return false;
    }
  }

  // ===== PERFORMANCE MONITORING =====
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();

    // Monitor resource loading
    this.monitorResourceLoading();

    // Monitor user interactions
    this.monitorUserInteractions();
  }

  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      
      this.reportMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  monitorResourceLoading() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.reportMetric('TTFB', navigation.responseStart - navigation.fetchStart);
      this.reportMetric('DOM_LOAD', navigation.domContentLoadedEventEnd - navigation.fetchStart);
      this.reportMetric('FULL_LOAD', navigation.loadEventEnd - navigation.fetchStart);
    });
  }

  monitorUserInteractions() {
    // Track button clicks
    document.addEventListener('click', (e) => {
      if (e.target.matches('button, .btn, a')) {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          this.reportMetric('INTERACTION_DELAY', endTime - startTime);
        });
      }
    });
  }

  reportMetric(name, value) {
    // Send metrics to analytics service
    console.log(`Performance Metric - ${name}: ${value}ms`);
    
    // You can send this to your analytics service
    if ('navigator' in window && 'sendBeacon' in navigator) {
      const data = JSON.stringify({ metric: name, value, timestamp: Date.now() });
      navigator.sendBeacon('/api/metrics', data);
    }
  }

  // ===== CRITICAL RESOURCE LOADING =====
  setupCriticalResourceLoading() {
    // Load critical CSS inline
    this.inlineCriticalCSS();

    // Defer non-critical CSS
    this.deferNonCriticalCSS();

    // Optimize font loading
    this.optimizeFontLoading();
  }

  inlineCriticalCSS() {
    // This would typically be done at build time
    // Here we can identify and inline critical CSS for above-the-fold content
    const criticalCSS = `
      .hero-section { min-height: 100vh; }
      .navbar { position: fixed; top: 0; width: 100%; }
      .fade-in { opacity: 0; transition: opacity 0.6s; }
      .fade-in.visible { opacity: 1; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  }

  deferNonCriticalCSS() {
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
    });
  }

  optimizeFontLoading() {
    // Use font-display: swap for better performance
    const fontFaces = document.styleSheets;
    
    Array.from(fontFaces).forEach(sheet => {
      try {
        Array.from(sheet.cssRules).forEach(rule => {
          if (rule instanceof CSSFontFaceRule) {
            rule.style.fontDisplay = 'swap';
          }
        });
      } catch (e) {
        // Cross-origin stylesheet, can't modify
      }
    });
  }

  // ===== PUBLIC METHODS =====
  
  // Method to manually trigger image optimization
  optimizeImages(selector = 'img') {
    const images = document.querySelectorAll(selector);
    images.forEach(img => this.loadElement(img));
  }

  // Method to preload specific resources
  preloadResource(href, as, type = null) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }

  // Method to get performance metrics
  getPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    return {
      ttfb: navigation.responseStart - navigation.fetchStart,
      domLoad: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      fullLoad: navigation.loadEventEnd - navigation.fetchStart,
      resources: performance.getEntriesByType('resource').length
    };
  }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other scripts
window.PerformanceOptimizer = performanceOptimizer;
