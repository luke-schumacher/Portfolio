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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;

    // Check for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');

            // Save preference
            if (htmlElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
