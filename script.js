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