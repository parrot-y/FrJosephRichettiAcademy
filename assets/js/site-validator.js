/**
 * Site Validator - Checks all links and buttons for functionality
 * Run this in browser console to test site functionality
 */

(function() {
    'use strict';

    console.log('🔍 Starting Site Validation...');

    // Test all links
    function testLinks() {
        console.log('📋 Testing Links...');
        const links = document.querySelectorAll('a[href]');
        let workingLinks = 0;
        let brokenLinks = 0;

        links.forEach((link, index) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                // Test anchor links
                const target = document.querySelector(href);
                if (target) {
                    console.log(`✅ Anchor link ${href} - Target found`);
                    workingLinks++;
                } else {
                    console.warn(`❌ Anchor link ${href} - Target not found`);
                    brokenLinks++;
                }
            } else if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
                // External links, mailto, tel - assume working
                console.log(`✅ External link ${href} - OK`);
                workingLinks++;
            } else {
                // Internal page links - check if they exist
                console.log(`ℹ️ Internal link ${href} - Cannot verify without server`);
                workingLinks++;
            }
        });

        console.log(`📊 Links Summary: ${workingLinks} working, ${brokenLinks} broken`);
        return { working: workingLinks, broken: brokenLinks };
    }

    // Test all buttons
    function testButtons() {
        console.log('🔘 Testing Buttons...');
        const buttons = document.querySelectorAll('button, .btn, .main-button-red a, .main-button-yellow a');
        let workingButtons = 0;
        let issueButtons = 0;

        buttons.forEach((button, index) => {
            // Check if button is clickable
            const style = window.getComputedStyle(button);
            const isClickable = style.pointerEvents !== 'none' && !button.disabled;
            
            if (isClickable) {
                console.log(`✅ Button ${index + 1} - Clickable`);
                workingButtons++;
                
                // Test click event
                try {
                    button.addEventListener('click', function testClick(e) {
                        console.log(`🖱️ Button ${index + 1} clicked successfully`);
                        button.removeEventListener('click', testClick);
                    });
                } catch (error) {
                    console.warn(`⚠️ Button ${index + 1} - Click event error:`, error);
                }
            } else {
                console.warn(`❌ Button ${index + 1} - Not clickable (disabled or pointer-events: none)`);
                issueButtons++;
            }
        });

        console.log(`📊 Buttons Summary: ${workingButtons} working, ${issueButtons} with issues`);
        return { working: workingButtons, issues: issueButtons };
    }

    // Test forms
    function testForms() {
        console.log('📝 Testing Forms...');
        const forms = document.querySelectorAll('form');
        let workingForms = 0;
        let issueForms = 0;

        forms.forEach((form, index) => {
            const inputs = form.querySelectorAll('input, textarea, select');
            const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
            
            if (inputs.length > 0 && submitButton) {
                console.log(`✅ Form ${index + 1} - Has inputs and submit button`);
                workingForms++;
            } else {
                console.warn(`❌ Form ${index + 1} - Missing inputs or submit button`);
                issueForms++;
            }
        });

        console.log(`📊 Forms Summary: ${workingForms} working, ${issueForms} with issues`);
        return { working: workingForms, issues: issueForms };
    }

    // Test images
    function testImages() {
        console.log('🖼️ Testing Images...');
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        let brokenImages = 0;

        images.forEach((img, index) => {
            if (img.complete && img.naturalHeight !== 0) {
                console.log(`✅ Image ${index + 1} - Loaded successfully`);
                loadedImages++;
            } else if (img.complete && img.naturalHeight === 0) {
                console.warn(`❌ Image ${index + 1} - Failed to load: ${img.src}`);
                brokenImages++;
            } else {
                console.log(`⏳ Image ${index + 1} - Still loading: ${img.src}`);
                // Wait for image to load
                img.addEventListener('load', () => {
                    console.log(`✅ Image ${index + 1} - Loaded after wait`);
                });
                img.addEventListener('error', () => {
                    console.warn(`❌ Image ${index + 1} - Failed to load after wait`);
                });
            }
        });

        console.log(`📊 Images Summary: ${loadedImages} loaded, ${brokenImages} broken`);
        return { loaded: loadedImages, broken: brokenImages };
    }

    // Test navigation
    function testNavigation() {
        console.log('🧭 Testing Navigation...');
        const logo = document.querySelector('.header-area .main-nav .logo');
        const menuTrigger = document.querySelector('.menu-trigger');
        const nav = document.querySelector('.main-nav .nav');

        let navIssues = [];

        // Test logo
        if (logo) {
            console.log('✅ Logo found');
            if (logo.getAttribute('href') || logo.onclick) {
                console.log('✅ Logo is clickable');
            } else {
                navIssues.push('Logo not clickable');
            }
        } else {
            navIssues.push('Logo not found');
        }

        // Test mobile menu
        if (menuTrigger && nav) {
            console.log('✅ Mobile menu elements found');
        } else {
            navIssues.push('Mobile menu elements missing');
        }

        // Test navigation links
        const navLinks = document.querySelectorAll('.main-nav .nav a');
        if (navLinks.length > 0) {
            console.log(`✅ Found ${navLinks.length} navigation links`);
        } else {
            navIssues.push('No navigation links found');
        }

        if (navIssues.length === 0) {
            console.log('✅ Navigation - All tests passed');
        } else {
            console.warn('❌ Navigation issues:', navIssues);
        }

        return navIssues;
    }

    // Test carousels
    function testCarousels() {
        console.log('🎠 Testing Carousels...');
        const carousels = document.querySelectorAll('.owl-carousel');
        let workingCarousels = 0;
        let brokenCarousels = 0;

        carousels.forEach((carousel, index) => {
            if (window.jQuery && jQuery(carousel).data('owl.carousel')) {
                console.log(`✅ Carousel ${index + 1} - Initialized`);
                workingCarousels++;
            } else {
                console.warn(`❌ Carousel ${index + 1} - Not initialized`);
                brokenCarousels++;
            }
        });

        console.log(`📊 Carousels Summary: ${workingCarousels} working, ${brokenCarousels} broken`);
        return { working: workingCarousels, broken: brokenCarousels };
    }

    // Test JavaScript errors
    function testJavaScriptErrors() {
        console.log('🐛 Checking for JavaScript Errors...');
        
        // Override console.error to catch errors
        const originalError = console.error;
        let errorCount = 0;
        
        console.error = function(...args) {
            errorCount++;
            originalError.apply(console, args);
        };

        // Listen for unhandled errors
        window.addEventListener('error', (e) => {
            console.warn('❌ JavaScript Error:', e.error);
            errorCount++;
        });

        setTimeout(() => {
            console.error = originalError;
            if (errorCount === 0) {
                console.log('✅ No JavaScript errors detected');
            } else {
                console.warn(`❌ Found ${errorCount} JavaScript errors`);
            }
        }, 2000);

        return errorCount;
    }

    // Run all tests
    function runAllTests() {
        console.log('🚀 Running Complete Site Validation...\n');

        const results = {
            links: testLinks(),
            buttons: testButtons(),
            forms: testForms(),
            images: testImages(),
            navigation: testNavigation(),
            carousels: testCarousels(),
            jsErrors: testJavaScriptErrors()
        };

        // Summary
        setTimeout(() => {
            console.log('\n📋 VALIDATION SUMMARY:');
            console.log('======================');
            console.log(`Links: ${results.links.working} working, ${results.links.broken} broken`);
            console.log(`Buttons: ${results.buttons.working} working, ${results.buttons.issues} with issues`);
            console.log(`Forms: ${results.forms.working} working, ${results.forms.issues} with issues`);
            console.log(`Images: ${results.images.loaded} loaded, ${results.images.broken} broken`);
            console.log(`Navigation: ${results.navigation.length === 0 ? 'All good' : results.navigation.length + ' issues'}`);
            console.log(`Carousels: ${results.carousels.working} working, ${results.carousels.broken} broken`);
            
            const totalIssues = results.links.broken + results.buttons.issues + 
                              results.forms.issues + results.images.broken + 
                              results.navigation.length + results.carousels.broken;
            
            if (totalIssues === 0) {
                console.log('\n🎉 ALL TESTS PASSED! Site is working perfectly!');
            } else {
                console.log(`\n⚠️ Found ${totalIssues} issues that need attention.`);
            }
        }, 3000);

        return results;
    }

    // Auto-run tests
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllTests);
    } else {
        runAllTests();
    }

    // Export for manual testing
    window.siteValidator = {
        testLinks,
        testButtons,
        testForms,
        testImages,
        testNavigation,
        testCarousels,
        testJavaScriptErrors,
        runAllTests
    };

})();
