// Deep Space Parallax Star Field
(function () {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // ── Layer definitions ────────────────────────────────────────────────────
    const LAYERS = [
        { count: 90, minSize: 0.4, maxSize: 0.8, minOp: 0.12, maxOp: 0.20, parallax: 0.008, twinkle: false },
        { count: 50, minSize: 0.9, maxSize: 1.5, minOp: 0.18, maxOp: 0.30, parallax: 0.020, twinkle: false },
        { count: 22, minSize: 1.6, maxSize: 2.6, minOp: 0.28, maxOp: 0.45, parallax: 0.042, twinkle: true  },
    ];

    // ── State ────────────────────────────────────────────────────────────────
    let stars = [];          // flat array; each star knows its layer index

    // Mouse parallax — normalized -0.5 → +0.5 of viewport
    const mouse = { targetX: 0, targetY: 0, easedX: 0, easedY: 0 };

    // Shooting star
    const shot = {
        state: 'idle',   // 'idle' | 'active'
        x: 0, y: 0,
        vx: 0, vy: 0,
        timer: nextShotDelay(),
    };

    // ── Helpers ──────────────────────────────────────────────────────────────
    function rand(min, max) { return Math.random() * (max - min) + min; }

    function nextShotDelay() { return rand(9000, 18000); }

    // ── Star factory ─────────────────────────────────────────────────────────
    function makeStar(layerIdx) {
        const l = LAYERS[layerIdx];
        return {
            layer:        layerIdx,
            x:            Math.random() * canvas.width,
            y:            Math.random() * canvas.height,
            size:         rand(l.minSize, l.maxSize),
            baseOpacity:  rand(l.minOp, l.maxOp),
            twinklePhase: rand(0, Math.PI * 2),
            twinkleSpeed: rand(0.008, 0.018),
        };
    }

    function initStars() {
        stars = [];
        LAYERS.forEach((_, i) => {
            for (let k = 0; k < LAYERS[i].count; k++) stars.push(makeStar(i));
        });
    }

    // ── Resize ───────────────────────────────────────────────────────────────
    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    // ── Shooting star init ───────────────────────────────────────────────────
    function spawnShot() {
        const angleDeg = rand(-12, 12);
        const angleRad = (angleDeg * Math.PI) / 180;
        const speed    = 1.8;
        shot.x   = -10;
        shot.y   = rand(canvas.height * 0.20, canvas.height * 0.80);
        shot.vx  = Math.cos(angleRad) * speed;
        shot.vy  = Math.sin(angleRad) * speed;
        shot.state = 'active';
    }

    // ── Draw ─────────────────────────────────────────────────────────────────
    function drawStars() {
        const ex = mouse.easedX;
        const ey = mouse.easedY;

        stars.forEach(s => {
            const l   = LAYERS[s.layer];
            const ox  = ex * canvas.width  * l.parallax;
            const oy  = ey * canvas.height * l.parallax;
            const px  = s.x + ox;
            const py  = s.y + oy;

            let opacity = s.baseOpacity;
            if (l.twinkle) {
                s.twinklePhase += s.twinkleSpeed;
                opacity = Math.max(0, s.baseOpacity + Math.sin(s.twinklePhase) * 0.10);
            }

            ctx.beginPath();
            ctx.arc(px, py, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${opacity.toFixed(3)})`;
            ctx.fill();
        });
    }

    function drawShootingStar() {
        if (shot.state !== 'active') return;

        // Tail: 80px behind travel direction
        const tailX = shot.x - (shot.vx / 1.8) * 80;
        const tailY = shot.y - (shot.vy / 1.8) * 80;

        // Core streak
        const grad = ctx.createLinearGradient(tailX, tailY, shot.x, shot.y);
        grad.addColorStop(0, 'rgba(165, 180, 252, 0)');
        grad.addColorStop(1, 'rgba(165, 180, 252, 0.55)');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shot.x, shot.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        // Soft glow halo (second pass, wider + very low opacity)
        const grad2 = ctx.createLinearGradient(tailX, tailY, shot.x, shot.y);
        grad2.addColorStop(0, 'rgba(165, 180, 252, 0)');
        grad2.addColorStop(1, `rgba(165, 180, 252, ${(0.55 * 0.2).toFixed(3)})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shot.x, shot.y);
        ctx.strokeStyle = grad2;
        ctx.lineWidth   = 3;
        ctx.stroke();
    }

    // ── Animation loop ───────────────────────────────────────────────────────
    let lastTime = 0;

    function animate(ts) {
        const dt = ts - lastTime;
        lastTime = ts;

        // Ease mouse parallax
        mouse.easedX += (mouse.targetX - mouse.easedX) * 0.055;
        mouse.easedY += (mouse.targetY - mouse.easedY) * 0.055;

        // Shooting star timer
        if (shot.state === 'idle') {
            shot.timer -= dt;
            if (shot.timer <= 0) spawnShot();
        } else {
            shot.x += shot.vx;
            shot.y += shot.vy;
            if (shot.x > canvas.width + 100) {
                shot.state = 'idle';
                shot.timer = nextShotDelay();
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars();
        drawShootingStar();

        requestAnimationFrame(animate);
    }

    // ── Event listeners ──────────────────────────────────────────────────────
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', e => {
        mouse.targetX = e.clientX / window.innerWidth  - 0.5;
        mouse.targetY = e.clientY / window.innerHeight - 0.5;
    });

    document.addEventListener('mouseleave', () => {
        mouse.targetX = 0;
        mouse.targetY = 0;
    });

    // ── Boot ─────────────────────────────────────────────────────────────────
    resizeCanvas();
    requestAnimationFrame(animate);
})();
