// Background Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Music Control
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = document.querySelector('.music-icon');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.classList.remove('playing');
        musicIcon.classList.add('paused');
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Playback failed:', error);
        });
        musicIcon.classList.remove('paused');
        musicIcon.classList.add('playing');
        isPlaying = true;
    }
});

// Auto-play attempt (will only work if user has interacted with the page)
document.addEventListener('click', () => {
    if (!isPlaying) {
        backgroundMusic.play().catch(error => {
            console.log('Auto-play prevented');
        });
        musicIcon.classList.remove('paused');
        musicIcon.classList.add('playing');
        isPlaying = true;
    }
}, { once: true });

// Countdown Timer
const weddingDate = new Date('2026-08-15T10:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth scroll
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.countdown-section').scrollIntoView({ behavior: 'smooth' });
});

// Form submission
document.getElementById('rsvpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        guests: document.getElementById('guests').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    alert(`Cảm ơn ${formData.name}! Chúng tôi đã nhận được xác nhận của bạn.`);
    
    // Reset form
    e.target.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.story-content, .rsvp-form, .countdown-container').forEach(el => {
    observer.observe(el);
});

// Add smooth animation to time boxes
const timeBoxes = document.querySelectorAll('.time-box');
timeBoxes.forEach((box, index) => {
    box.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
});