// Apply mouse tracking glow effect to all Bento Boxes and Staggered entry
const bentoBoxes = document.querySelectorAll('.bento-box');

bentoBoxes.forEach((box, index) => {
    // Add staggered entry delay
    box.style.animationDelay = `${index * 0.15}s`;

    box.addEventListener('mousemove', e => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        
        box.style.setProperty('--mouse-x', `${x}px`);
        box.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Auto-scrolling for Portfolio Gallery
const portfolioSlider = document.querySelector('.portfolio-slider');
if (portfolioSlider) {
    let isHovered = false;

    // Pause auto-scroll when user hovers or interacts with the gallery
    portfolioSlider.addEventListener('mouseenter', () => isHovered = true);
    portfolioSlider.addEventListener('mouseleave', () => isHovered = false);
    
    portfolioSlider.addEventListener('touchstart', () => isHovered = true);
    portfolioSlider.addEventListener('touchend', () => {
        setTimeout(() => isHovered = false, 2000); // Resume 2s after touch ends
    });

    setInterval(() => {
        if (!isHovered) {
            const item = portfolioSlider.querySelector('.portfolio-item');
            if (item) {
                const itemWidth = item.offsetWidth;
                const gap = 24; // the gap size defined in CSS
                const maxScroll = portfolioSlider.scrollWidth - portfolioSlider.clientWidth;
                
                // If we've reached the end (with a 10px buffer), scroll back to start
                if (portfolioSlider.scrollLeft >= maxScroll - 10) {
                    portfolioSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    portfolioSlider.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
                }
            }
        }
    }, 3000); // Scroll every 3 seconds
    
    // Manual Navigation arrows
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const itemWidth = portfolioSlider.querySelector('.portfolio-item').offsetWidth;
            portfolioSlider.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            const itemWidth = portfolioSlider.querySelector('.portfolio-item').offsetWidth;
            portfolioSlider.scrollBy({ left: (itemWidth + 24), behavior: 'smooth' });
        });
    }
}
