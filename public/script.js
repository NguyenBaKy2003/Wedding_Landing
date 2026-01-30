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

// Auto-play music on page load
window.addEventListener('load', () => {
    backgroundMusic.play().then(() => {
        isPlaying = true;
        musicIcon.classList.add('playing');
        musicIcon.textContent = '♫';
    }).catch(error => {
        console.log('Auto-play prevented by browser. User interaction required.');
        // If auto-play fails, try again on first user interaction
        document.addEventListener('click', () => {
            if (!isPlaying) {
                backgroundMusic.play().then(() => {
                    isPlaying = true;
                    musicIcon.classList.add('playing');
                    musicIcon.textContent = '♫';
                }).catch(err => {
                    console.log('Playback failed:', err);
                });
            }
        }, { once: true });
    });
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.classList.remove('playing');
        musicIcon.classList.add('paused');
        musicIcon.textContent = '🔇'; // Icon tắt nhạc
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Playback failed:', error);
        });
        musicIcon.classList.remove('paused');
        musicIcon.classList.add('playing');
        musicIcon.textContent = '♫'; // Icon bật nhạc
        isPlaying = true;
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

// Gift Section Toggle
const groomBtn = document.getElementById('groomBtn');
const brideBtn = document.getElementById('brideBtn');
const groomGift = document.getElementById('groomGift');
const brideGift = document.getElementById('brideGift');

groomBtn.addEventListener('click', () => {
    groomBtn.classList.add('active');
    brideBtn.classList.remove('active');
    groomGift.classList.add('active');
    brideGift.classList.remove('active');
});

brideBtn.addEventListener('click', () => {
    brideBtn.classList.add('active');
    groomBtn.classList.remove('active');
    brideGift.classList.add('active');
    groomGift.classList.remove('active');
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

document.querySelectorAll('.story-content, .gift-content, .countdown-container').forEach(el => {
    observer.observe(el);
});

// Add smooth animation to time boxes
const timeBoxes = document.querySelectorAll('.time-box');
timeBoxes.forEach((box, index) => {
    box.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
});