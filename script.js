// --- كود تشغيل قائمة البرجر ---
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
const navLinksList = document.querySelectorAll('.nav-links li a');
const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

navLinksList.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// --- كود النسخ وتحديد الرابط النشط ---
function copyText() {
    navigator.clipboard.writeText("w.78");
    alert('تم نسخ اسم مستخدم ديسكورد: w.78');
}

const sections = document.querySelectorAll('section');
const headerNavLinks = document.querySelectorAll('.nav-links a'); 

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    headerNavLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});