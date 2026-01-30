// Prevent scrolling when modal is open
document.addEventListener('DOMContentLoaded', function() {
    // Add modal-open class to body when page loads
    document.body.classList.add('modal-open');
    
    // Welcome Modal & Enter Button
    const welcomeModal = document.getElementById('welcomeModal');
    const enterBtn = document.getElementById('enterBtn');
    
    enterBtn.addEventListener('click', function() {
        // First, scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'instant' // Instant scroll without animation
        });
        
        // Then hide modal and remove scroll lock
        welcomeModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        
        // Optional: Start music when entering
        const music = document.getElementById('backgroundMusic');
        if (music) {
            music.play().catch(e => console.log('Auto-play prevented'));
        }
    });
    
    // Background Slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    setInterval(showNextSlide, 5000);
    
    // Music Toggle
    const musicToggle = document.getElementById('musicToggle');
    const music = document.getElementById('backgroundMusic');
    const musicIcon = document.querySelector('.music-icon');
    
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play();
            musicIcon.classList.add('playing');
            musicIcon.classList.remove('paused');
        } else {
            music.pause();
            musicIcon.classList.remove('playing');
            musicIcon.classList.add('paused');
        }
    });
    
    // Countdown Timer
    const weddingDate = new Date('2026-02-11T10:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Gift Section Toggle
    const groomBtn = document.getElementById('groomBtn');
    const brideBtn = document.getElementById('brideBtn');
    const groomGift = document.getElementById('groomGift');
    const brideGift = document.getElementById('brideGift');
    
    groomBtn.addEventListener('click', function() {
        groomBtn.classList.add('active');
        brideBtn.classList.remove('active');
        groomGift.classList.add('active');
        brideGift.classList.remove('active');
    });
    
    brideBtn.addEventListener('click', function() {
        brideBtn.classList.add('active');
        groomBtn.classList.remove('active');
        brideGift.classList.add('active');
        groomGift.classList.remove('active');
    });
    
    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});