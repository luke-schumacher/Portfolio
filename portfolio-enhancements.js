// Project Filtering System
document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden-filter');
                } else {
                    const categories = card.getAttribute('data-categories');
                    if (categories && categories.includes(filter)) {
                        card.classList.remove('hidden-filter');
                    } else {
                        card.classList.add('hidden-filter');
                    }
                }
            });
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('.project-modal');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal on overlay click or close button
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal-close');

        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });

    // Dark Mode Toggle (iOS-style)
    const themeCheckbox = document.getElementById('theme-checkbox');
    const htmlElement = document.documentElement;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            if (themeCheckbox.checked) {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    let carouselInterval;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (indicators[i]) {
                indicators[i].classList.remove('active');
            }
        });

        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        currentIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function startCarousel() {
        carouselInterval = setInterval(nextTestimonial, 6000);
    }

    function stopCarousel() {
        clearInterval(carouselInterval);
    }

    // Initialize carousel if testimonials exist
    if (testimonials.length > 0) {
        startCarousel();

        // Click handlers for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopCarousel();
                showTestimonial(index);
                startCarousel();
            });
        });

        // Pause on hover
        const carouselContainer = document.querySelector('.testimonials-carousel');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopCarousel);
            carouselContainer.addEventListener('mouseleave', startCarousel);
        }
    }
});
