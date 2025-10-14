/**
 * EMERGENCY LOGO FIX - IMMEDIATE EXECUTION
 * Forces logo to proper position and prevents overlap
 */

(function() {
    'use strict';

    // Execute immediately - don't wait for DOM ready
    function forceLogoFix() {
        console.log('🚨 EMERGENCY LOGO FIX - EXECUTING...');

        // FORCE BODY PADDING TO PREVENT OVERLAP
        document.body.style.paddingTop = '80px';
        document.body.style.marginTop = '0';

        // FIND AND FIX HEADER
        const header = document.querySelector('.header-area');
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.right = '0';
            header.style.width = '100%';
            header.style.height = 'auto';
            header.style.minHeight = '70px';
            header.style.maxHeight = '80px';
            header.style.zIndex = '9999';
            header.style.background = 'rgba(35, 45, 57, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.padding = '0';
            header.style.margin = '0';
            header.style.overflow = 'visible';
        }

        // FIND AND FIX LOGO
        const logo = document.querySelector('.header-area .main-nav .logo, .header-area .logo, .main-nav .logo, .logo');
        if (logo) {
            logo.style.position = 'static';
            logo.style.display = 'inline-flex';
            logo.style.alignItems = 'center';
            logo.style.gap = '8px';
            logo.style.lineHeight = 'normal';
            logo.style.height = 'auto';
            logo.style.width = 'auto';
            logo.style.maxWidth = '250px';
            logo.style.margin = '0';
            logo.style.padding = '10px 0';
            logo.style.top = 'auto';
            logo.style.left = 'auto';
            logo.style.right = 'auto';
            logo.style.bottom = 'auto';
            logo.style.transform = 'none';
            logo.style.zIndex = '1';
            logo.style.overflow = 'visible';
            logo.style.float = 'none';
            logo.style.clear = 'none';
        }

        // FIND AND FIX LOGO IMAGE
        const logoImg = document.querySelector('.logo-img, .header-area .main-nav .logo img, .header-area .logo img');
        if (logoImg) {
            logoImg.style.height = '40px';
            logoImg.style.width = 'auto';
            logoImg.style.maxHeight = '40px';
            logoImg.style.maxWidth = 'none';
            logoImg.style.position = 'static';
            logoImg.style.display = 'inline-block';
            logoImg.style.margin = '0';
            logoImg.style.padding = '0';
            logoImg.style.borderRadius = '6px';
            logoImg.style.flexShrink = '0';
            logoImg.style.objectFit = 'contain';
        }

        // FIND AND FIX LOGO TEXT
        const logoText = document.querySelector('.logo-text, .header-area .main-nav .logo span, .header-area .logo span');
        if (logoText) {
            logoText.style.fontSize = '16px';
            logoText.style.lineHeight = '1.2';
            logoText.style.color = '#fff';
            logoText.style.fontWeight = '600';
            logoText.style.margin = '0';
            logoText.style.padding = '0';
            logoText.style.position = 'static';
            logoText.style.display = 'inline-block';
            logoText.style.whiteSpace = 'nowrap';
            logoText.style.overflow = 'hidden';
            logoText.style.textOverflow = 'ellipsis';
            logoText.style.maxWidth = '180px';
        }

        // FIX MAIN BANNER/CONTENT POSITIONING
        const mainBanner = document.querySelector('.main-banner, .heading-page');
        if (mainBanner) {
            mainBanner.style.marginTop = '0';
            mainBanner.style.paddingTop = '20px';
            mainBanner.style.position = 'relative';
            mainBanner.style.zIndex = '1';
        }

        // FIX SUB-HEADER
        const subHeader = document.querySelector('.sub-header');
        if (subHeader) {
            subHeader.style.marginTop = '80px';
            subHeader.style.position = 'relative';
            subHeader.style.zIndex = '1';
        }

        // FIX CONTAINER
        const container = document.querySelector('.header-area .container');
        if (container) {
            container.style.height = '100%';
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.padding = '0 15px';
            container.style.margin = '0 auto';
            container.style.maxWidth = '1200px';
            container.style.width = '100%';
        }

        // FIX MAIN NAV
        const mainNav = document.querySelector('.header-area .main-nav');
        if (mainNav) {
            mainNav.style.width = '100%';
            mainNav.style.height = '100%';
            mainNav.style.display = 'flex';
            mainNav.style.alignItems = 'center';
            mainNav.style.justifyContent = 'space-between';
            mainNav.style.position = 'relative';
            mainNav.style.padding = '0';
            mainNav.style.margin = '0';
        }

        // MOBILE FIXES
        if (window.innerWidth <= 767) {
            document.body.style.paddingTop = '70px';
            
            if (header) {
                header.style.minHeight = '60px';
                header.style.maxHeight = '70px';
            }
            
            if (subHeader) {
                subHeader.style.marginTop = '70px';
            }
            
            if (logoImg) {
                logoImg.style.height = '32px';
                logoImg.style.maxHeight = '32px';
            }
            
            if (logoText) {
                logoText.style.fontSize = '13px';
                logoText.style.maxWidth = '120px';
                logoText.style.color = '#1e1e1e';
            }
            
            if (logo) {
                logo.style.maxWidth = '180px';
                logo.style.gap = '6px';
            }
        }

        // VERY SMALL SCREENS
        if (window.innerWidth <= 480) {
            if (logoText) {
                logoText.style.display = 'none';
            }
            
            if (logo) {
                logo.style.justifyContent = 'flex-start';
                logo.style.maxWidth = '50px';
            }
        }

        console.log('✅ EMERGENCY LOGO FIX - COMPLETED!');
    }

    // Execute immediately
    forceLogoFix();

    // Execute again when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceLogoFix);
    }

    // Execute again after a short delay to override any conflicting scripts
    setTimeout(forceLogoFix, 100);
    setTimeout(forceLogoFix, 500);
    setTimeout(forceLogoFix, 1000);

    // Execute on window resize
    window.addEventListener('resize', forceLogoFix);

    // Execute when page is fully loaded
    window.addEventListener('load', forceLogoFix);

    // Override any jQuery/other scripts that might interfere
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                const target = mutation.target;
                if (target.classList.contains('logo') || 
                    target.classList.contains('header-area') ||
                    target.classList.contains('main-nav')) {
                    setTimeout(forceLogoFix, 10);
                }
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['style', 'class']
    });

    // Force fix every 2 seconds for the first 10 seconds (in case other scripts interfere)
    let fixCount = 0;
    const forceInterval = setInterval(() => {
        forceLogoFix();
        fixCount++;
        if (fixCount >= 5) {
            clearInterval(forceInterval);
        }
    }, 2000);

})();
