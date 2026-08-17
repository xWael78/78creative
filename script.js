// Scroll reveal + mouse tracking glow for all Bento Boxes
const bentoBoxes = document.querySelectorAll('.bento-box');

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

bentoBoxes.forEach((box, index) => {
    // Staggered reveal delay
    box.style.setProperty('--reveal-delay', `${index * 0.07}s`);
    revealObserver.observe(box);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Tab Filtering (3 categories)
const portfolioTabs = document.querySelectorAll('.pf-tab');
const portfolioCards = document.querySelectorAll('.pf-card');

function filterPortfolio(filter) {
    let shown = 0;
    portfolioCards.forEach(card => {
        const show = card.dataset.category === filter;
        if (show) {
            card.style.display = '';
            card.classList.remove('pf-in');
            void card.offsetWidth; // restart animation
            card.style.animationDelay = `${shown * 0.08}s`;
            card.classList.add('pf-in');
            shown++;
        } else {
            card.style.display = 'none';
        }
    });
}

portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        portfolioTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        filterPortfolio(tab.dataset.filter);
    });
});

// Show the first category by default
filterPortfolio('identity');

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu after clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// Scroll-spy: highlight the active nav link
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = ['about', 'services', 'skills', 'portfolio', 'contact'];

function updateActiveNav() {
    const scrollPos = window.scrollY + 160;
    let current = 'about';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Scroll progress bar
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const doc = document.documentElement;
        const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// --- Image Protection ---
document.addEventListener('contextmenu', e => {
    if (e.target.tagName === 'IMG' || e.target.closest('.pf-card') || e.target.closest('.photo-box')) {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', e => {
    if (e.target.tagName === 'IMG' || e.target.closest('.pf-card') || e.target.closest('.photo-box')) {
        e.preventDefault();
    }
});

document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U' || e.key === 'i' || e.key === 'I')) {
        e.preventDefault();
    }
});
