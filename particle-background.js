// Particle Network Background Animation
(function() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOnCanvas = false;

    // Configuration
    const config = {
        particleCount: 100,
        particleMinSize: 2,
        particleMaxSize: 4,
        connectionDistance: 180,
        mouseInfluenceRadius: 250,
        baseSpeed: 0.4,
        colors: {
            light: {
                particles: ['rgba(102, 126, 234, 0.8)', 'rgba(118, 75, 162, 0.8)', 'rgba(99, 102, 241, 0.75)'],
                connections: 'rgba(102, 126, 234, 0.2)'
            },
            dark: {
                particles: ['rgba(167, 139, 250, 0.9)', 'rgba(129, 140, 248, 0.9)', 'rgba(196, 181, 253, 0.85)'],
                connections: 'rgba(167, 139, 250, 0.18)'
            }
        }
    };

    // Resize canvas to full window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Check if dark mode is active
    function isDarkMode() {
        return document.documentElement.classList.contains('dark');
    }

    // Get current color scheme
    function getColors() {
        return isDarkMode() ? config.colors.dark : config.colors.light;
    }

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (config.particleMaxSize - config.particleMinSize) + config.particleMinSize;
            this.speedX = (Math.random() - 0.5) * config.baseSpeed;
            this.speedY = (Math.random() - 0.5) * config.baseSpeed;
            this.colorIndex = Math.floor(Math.random() * 3);
        }

        update() {
            // Mouse influence
            if (isMouseOnCanvas) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseInfluenceRadius) {
                    const force = (config.mouseInfluenceRadius - distance) / config.mouseInfluenceRadius;
                    const angle = Math.atan2(dy, dx);
                    // Gentle attraction to mouse
                    this.speedX += Math.cos(angle) * force * 0.02;
                    this.speedY += Math.sin(angle) * force * 0.02;
                }
            }

            // Apply velocity with damping
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX *= 0.99;
            this.speedY *= 0.99;

            // Ensure minimum speed
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (speed < config.baseSpeed * 0.5) {
                this.speedX += (Math.random() - 0.5) * 0.1;
                this.speedY += (Math.random() - 0.5) * 0.1;
            }

            // Wrap around edges
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.y < -50) this.y = canvas.height + 50;
            if (this.y > canvas.height + 50) this.y = -50;
        }

        draw() {
            const colors = getColors();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = colors.particles[this.colorIndex];
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const count = Math.min(config.particleCount, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connections between particles
    function drawConnections() {
        const colors = getColors();
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = colors.connections.replace('0.15', (0.15 * opacity).toFixed(2))
                                                         .replace('0.12', (0.12 * opacity).toFixed(2));
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw connections to mouse
        if (isMouseOnCanvas) {
            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.mouseInfluenceRadius) {
                    const opacity = 1 - (distance / config.mouseInfluenceRadius);
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = colors.connections.replace('0.15', (0.25 * opacity).toFixed(2))
                                                         .replace('0.12', (0.2 * opacity).toFixed(2));
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseOnCanvas = true;
    });

    document.addEventListener('mouseleave', () => {
        isMouseOnCanvas = false;
    });

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Re-initialize on theme change
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                // Theme changed, colors will update automatically on next frame
            }
        });
    });

    observer.observe(document.documentElement, { attributes: true });
})();
