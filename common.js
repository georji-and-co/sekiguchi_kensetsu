/* common.js — 関口建設 株式会社 */

(function () {
  'use strict';

  /* ── Active nav ───────────────── */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a, .sp-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Hamburger ────────────────── */
  const ham  = document.querySelector('.hamburger');
  const spNav = document.querySelector('.sp-nav');
  if (ham && spNav) {
    ham.addEventListener('click', () => {
      const open = spNav.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    spNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        spNav.classList.remove('open');
        ham.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Fade-in ───────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    io.observe(el);
  });

  /* ── Smooth anchor scroll ─────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--offset')) || 112;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
