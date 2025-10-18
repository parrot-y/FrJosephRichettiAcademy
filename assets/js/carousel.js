// Auto-rotating Image Carousel with Full Coverage
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    if (slides.length === 0) return; // Exit if no slides found
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Auto-advance every 2 seconds (2000ms)
    setInterval(nextSlide, 2000);
});
