// ================================================================
// CARRIED INSIGHT — Site JS
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Nav scroll behavior ----
  const nav = document.querySelector('nav');
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile menu ----
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');

  hamburger?.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMobile = () => {
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose?.addEventListener('click', closeMobile);
  mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

  // ---- Intersection Observer for reveal animations ----
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  // ---- Hero stagger on load ----
  const heroEls = document.querySelectorAll('.hero-stagger');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 140);
  });

  // ---- Stats counter animation ----
  const stats = document.querySelectorAll('.stat-num[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(s => statsObserver.observe(s));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- Contact form ----
  const form = document.getElementById('inquiryForm');
  const formSuccess = document.querySelector('.form-success');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate submission (replace with real endpoint)
    await new Promise(resolve => setTimeout(resolve, 1200));

    form.style.display = 'none';
    formSuccess.classList.add('visible');
  });

  // ---- Cursor dot (desktop only) ----
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: rgba(201, 168, 100, 0.7);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.08s ease, width 0.2s, height 0.2s, opacity 0.3s;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    let cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
    });

    document.querySelectorAll('a, button, .practice-card, .archetype-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.opacity = '0.4';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '6px';
        cursor.style.height = '6px';
        cursor.style.opacity = '1';
      });
    });
  }

});
