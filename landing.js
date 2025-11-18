document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
    initCountdown();
    initSmoothScroll();
});

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');

        pergunta.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initCountdown() {
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    const endTime = new Date().getTime() + (1 * 60 * 60 * 1000) + (27 * 60 * 1000) + (47 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            horasEl.textContent = '00';
            minutosEl.textContent = '00';
            segundosEl.textContent = '00';
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        horasEl.textContent = String(hours).padStart(2, '0');
        minutosEl.textContent = String(minutes).padStart(2, '0');
        segundosEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#checkout') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
