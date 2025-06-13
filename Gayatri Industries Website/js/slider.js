// Product Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.product-slider');
    const slides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slider || slides.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth = slides[0].clientWidth;
    let slidesPerView = calculateSlidesPerView();
    
    // Calculate how many slides to show based on screen width
    function calculateSlidesPerView() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) return 1;
        if (windowWidth < 992) return 2;
        return 3;
    }
    
    // Update slide width and slides per view on window resize
    window.addEventListener('resize', function() {
        slideWidth = slides[0].clientWidth;
        slidesPerView = calculateSlidesPerView();
        updateSliderPosition();
    });
    
    // Update slider position
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < slides.length - slidesPerView) {
            currentIndex++;
        } else {
            // Loop back to first slide with animation
            slider.style.transition = 'none';
            currentIndex = 0;
            setTimeout(() => {
                slider.style.transition = 'transform 0.3s ease';
                updateSliderPosition();
            }, 10);
        }
        updateSliderPosition();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop to last slide with animation
            slider.style.transition = 'none';
            currentIndex = slides.length - slidesPerView;
            setTimeout(() => {
                slider.style.transition = 'transform 0.3s ease';
                updateSliderPosition();
            }, 10);
        }
        updateSliderPosition();
    }
    
    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Swipe left
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Swipe right
        }
    }
    
    // Auto slide (optional)
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Pause auto slide on touch
    slider.addEventListener('touchstart', stopAutoSlide, { passive: true });
    slider.addEventListener('touchend', function() {
        setTimeout(startAutoSlide, 1000); // Resume after 1 second
    }, { passive: true });
});