/* =========================================================================
   Luke Schumacher — Portfolio runtime
   Vanilla, no dependencies. Everything degrades gracefully.
   ========================================================================= */
(() => {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------- Theme --- */
  const root = document.documentElement;

  const applyTheme = (mode) => {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
  };

  const currentTheme = () => {
    const set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  $('#theme-btn')?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('ls-theme', next); } catch {}
    $('#theme-btn').setAttribute('aria-label', `Switch to ${next === 'dark' ? 'light' : 'dark'} theme`);
  });

  /* ------------------------------------------------------- Nav + routing -- */
  const nav      = $('#nav');
  const pages    = $$('.page');
  const navLinks = $$('[data-route]');
  const navMarks = $$('.nav__links [data-route], .nav__drawer [data-route], .footer__list [data-route]');
  const pill     = $('#nav-pill');
  const drawer   = $('#drawer');
  const burger   = $('#burger');
  const ids      = pages.map((p) => p.id);

  const movePill = () => {
    if (!pill) return;
    const active = $('.nav__link[aria-current="page"]');
    if (!active) { pill.dataset.ready = 'false'; return; }
    pill.style.setProperty('--pill-x', `${active.offsetLeft}px`);
    pill.style.setProperty('--pill-w', `${active.offsetWidth}px`);
    pill.dataset.ready = 'true';
  };

  const setActive = (id) => {
    pages.forEach((p) => { p.dataset.active = String(p.id === id); });
    navMarks.forEach((a) => {
      if (a.dataset.route === id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const label = navLinks.find((a) => a.dataset.route === id)?.dataset.title;
    document.title = `Luke Schumacher — ${label || 'AI Research Engineer'}`;
    movePill();
    observeReveals();
  };

  const go = (id, push = true) => {
    if (!ids.includes(id)) id = 'home';
    if (push) history.pushState({ id }, '', `#${id}`);
    closeDrawer();

    const commit = () => {
      setActive(id);
      window.scrollTo(0, 0);
    };

    if (document.startViewTransition && !reduced.matches) document.startViewTransition(commit);
    else commit();
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-route]');
    if (!a) return;
    e.preventDefault();
    go(a.dataset.route);
  });

  window.addEventListener('popstate', () => go((location.hash || '#home').slice(1), false));
  window.addEventListener('resize', movePill, { passive: true });

  /* ------------------------------------------------------------ Drawer --- */
  function closeDrawer() {
    if (!drawer) return;
    drawer.dataset.drawer = 'closed';
    burger?.setAttribute('aria-expanded', 'false');
  }
  burger?.addEventListener('click', () => {
    const open = drawer.dataset.drawer === 'open';
    drawer.dataset.drawer = open ? 'closed' : 'open';
    burger.setAttribute('aria-expanded', String(!open));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    closeDrawer();
    $$('dialog.modal.is-fallback').forEach((d) => { d.removeAttribute('open'); d.classList.remove('is-fallback'); });
    const s = document.getElementById('scrim');
    if (s && !s.hidden) { s.hidden = true; document.body.style.overflow = ''; }
  });

  /* --------------------------------------------------- Scroll behaviour --- */
  const progress = $('#progress');
  // Where the browser drives the progress bar off a scroll timeline, stay out
  // of its way — the CSS version runs off the main thread.
  const cssProgress = window.CSS?.supports?.('animation-timeline: scroll()') ?? false;
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (nav) nav.dataset.scrolled = String(y > 6);
      if (progress && !cssProgress) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------ Reveal on scroll */

  // Figures count up when their tile arrives — 310 reads as a number you
  // watched being counted rather than one that was always there.
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -9 * t));

  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const final = el.textContent;
    if (reduced.matches) return;

    const duration = 1150;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = prefix + Math.round(easeOutExpo(t) * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = final;
    };
    el.textContent = prefix + '0' + suffix;
    requestAnimationFrame(step);
  };

  let io;
  function observeReveals() {
    if (!('IntersectionObserver' in window)) {
      $$('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      $$('[data-count]').forEach((el) => el.dataset.counted = 'true');
      return;
    }
    io ||= new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        io.unobserve(el);

        const figure = el.matches('[data-count]') ? el : $('[data-count]', el);
        if (figure && figure.dataset.counted !== 'true') {
          figure.dataset.counted = 'true';
          const delay = (Number(getComputedStyle(el).getPropertyValue('--i')) || 0) * 70;
          setTimeout(() => countUp(figure), delay + 120);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    const active = $('.page[data-active="true"]') || document;
    $$('[data-reveal]:not(.is-visible)', active).forEach((el) => {
      // Stagger against siblings that also reveal, so a delay always reflects
      // position within its own group rather than document order.
      if (!el.style.getPropertyValue('--i')) {
        const group = Array.from(el.parentElement?.children || []).filter((n) => n.hasAttribute('data-reveal'));
        const idx = group.indexOf(el);
        el.style.setProperty('--i', String(idx > 0 ? Math.min(idx, 5) : 0));
      }
      io.observe(el);
    });
  }

  /* ----------------------------------------------------- Project filters -- */
  const grid     = $('#projects');
  const filters  = $$('.filter');
  const projects = grid ? $$('.project', grid) : [];
  const empty    = $('#projects-empty');

  $$('[data-project-count]').forEach((el) => { el.textContent = projects.length; });

  filters.forEach((btn) => {
    const key = btn.dataset.filter;
    const n = key === 'all'
      ? projects.length
      : projects.filter((p) => (p.dataset.cat || '').split(' ').includes(key)).length;
    const slot = $('.filter__n', btn);
    if (slot) slot.textContent = n;
  });

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let shown = 0;
      projects.forEach((card) => {
        const match = key === 'all' || (card.dataset.cat || '').split(' ').includes(key);
        card.dataset.hidden = String(!match);
        if (match) {
          shown++;
          if (!reduced.matches) {
            card.animate(
              [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
              { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)', delay: Math.min(shown * 22, 200) }
            );
          }
        }
      });
      if (empty) empty.hidden = shown > 0;
    });
  });

  /* -------------------------------------------------------------- Modals -- */
  // <dialog>.showModal() is unavailable in sandboxed frames and older engines,
  // so fall back to a plain open dialog plus our own scrim.
  const scrim = $('#scrim');

  const openDialog = (dlg) => {
    if (!dlg) return;
    let modal = false;
    try {
      if (typeof dlg.showModal === 'function') { dlg.showModal(); modal = true; }
    } catch (e) { /* fall through */ }
    if (!modal) {
      dlg.setAttribute('open', '');
      dlg.classList.add('is-fallback');
      if (scrim) scrim.hidden = false;
    }
    document.body.style.overflow = 'hidden';
    $('[data-close]', dlg)?.focus();
  };

  const closeDialog = (dlg) => {
    if (!dlg) return;
    if (dlg.classList.contains('is-fallback')) {
      dlg.removeAttribute('open');
      dlg.classList.remove('is-fallback');
      if (scrim) scrim.hidden = true;
      document.body.style.overflow = '';
    } else if (typeof dlg.close === 'function') {
      dlg.close();
    }
  };

  const closeAllDialogs = () => $$('dialog.modal[open]').forEach(closeDialog);

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) { openDialog(document.getElementById(opener.dataset.open)); return; }
    const closer = e.target.closest('[data-close]');
    if (closer) closeDialog(closer.closest('dialog'));
  });

  scrim?.addEventListener('click', closeAllDialogs);

  $$('dialog.modal').forEach((dlg) => {
    // Clicking the backdrop area, outside the scroll panel, closes.
    dlg.addEventListener('click', (e) => { if (e.target === dlg) closeDialog(dlg); });
    dlg.addEventListener('close', () => { document.body.style.overflow = ''; });
  });

  /* ------------------------------------------------------------- Quotes -- */
  const quotes = $$('.quote');
  const qdots  = $$('.quotes__dot');
  let qi = 0, qtimer = null;

  const showQuote = (i) => {
    qi = (i + quotes.length) % quotes.length;
    quotes.forEach((q, n) => { q.dataset.active = String(n === qi); });
    qdots.forEach((d, n) => {
      if (n === qi) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  };
  const startQuotes = () => { if (quotes.length > 1) qtimer = setInterval(() => showQuote(qi + 1), 7000); };
  const stopQuotes  = () => { clearInterval(qtimer); };

  if (quotes.length) {
    showQuote(0);
    startQuotes();
    qdots.forEach((d, n) => d.addEventListener('click', () => { stopQuotes(); showQuote(n); startQuotes(); }));
    const wrap = $('.quotes');
    wrap?.addEventListener('mouseenter', stopQuotes);
    wrap?.addEventListener('mouseleave', startQuotes);
    wrap?.addEventListener('focusin', stopQuotes);
  }

  /* --------------------------------------------------------- Media fades -- */
  $$('img[loading="lazy"]').forEach((img) => {
    if (img.complete) return;
    img.style.opacity = '0';
    img.style.transition = 'opacity .5s cubic-bezier(.4,0,.2,1)';
    img.addEventListener('load', () => { img.style.opacity = '1'; }, { once: true });
    img.addEventListener('error', () => { img.style.opacity = '1'; }, { once: true });
  });

  /* ---------------------------------------------------------------- Boot -- */
  document.fonts?.ready.then(movePill);
  go((location.hash || '#home').slice(1), false);
  requestAnimationFrame(() => { requestAnimationFrame(movePill); });
})();
