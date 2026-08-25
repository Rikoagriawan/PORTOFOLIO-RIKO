const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☾';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.textContent = isDark ? '☾' : '☀';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

/*Kategori Skill*/
const btnkat = document.getElementById('toggleBtn');
const btnkat2 = document.getElementById('toggleBtn2');
const box = document.getElementById('contentBox');
const box2 = document.getElementById('contentBox2');

btnkat.addEventListener("click", function () {
            // Toggle tampil/sembunyi
            if (box.style.display === "block") {
                box.style.display = "none";
                btnkat.setAttribute('aria-expanded', 'false');
            } else {
                box.style.display = "block";
                btnkat.setAttribute('aria-expanded', 'true');
            }
        });

btnkat2.addEventListener("click", function () {
            // Toggle tampil/sembunyi
            if (box2.style.display === "block") {
                box2.style.display = "none";
                btnkat2.setAttribute('aria-expanded', 'false');
            } else {
                box2.style.display = "block";
                btnkat2.setAttribute('aria-expanded', 'true');
            }
        });

/*Kategori Achievement*/
document.querySelectorAll('.achievement-category-toggle').forEach((categoryButton) => {
    categoryButton.addEventListener('click', () => {
        const details = document.getElementById(categoryButton.getAttribute('aria-controls'));
        const isOpen = categoryButton.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.achievement-category-toggle').forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
            document.getElementById(button.getAttribute('aria-controls')).hidden = true;
        });

        if (!isOpen) {
            categoryButton.setAttribute('aria-expanded', 'true');
            details.hidden = false;
        }
    });
});

/*Carousel Portfolio*/
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelector('.carousel-dots');
    let currentSlide = 0;
    let touchStartX = 0;

    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show portfolio image ${index + 1}`);
        dot.addEventListener('click', () => showSlide(index));
        dots.appendChild(dot);
    });

    const showSlide = (slideIndex) => {
        currentSlide = (slideIndex + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };

    carousel.querySelector('.carousel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
    carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(currentSlide + 1));
    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
        const distance = event.changedTouches[0].screenX - touchStartX;
        if (Math.abs(distance) > 40) showSlide(currentSlide + (distance < 0 ? 1 : -1));
    }, { passive: true });

    showSlide(0);
});

/* Kirim Email */
if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = 'Please fill in all fields before sending.';
            formStatus.style.color = '#ff6b6b';
            return;
        }

        const recipient = 'Rikoagriawan64@gmail.com';
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        );

        formStatus.textContent = 'Opening your email app...';
        formStatus.style.color = '#4ade80';

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
}

const btn = document.getElementById('keatas');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

btn.addEventListener('click', () => {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (err) {
        window.scrollTo(0, 0);
    }
});
