// ================================================================
// CARRIED INSIGHT — Site JS
// ================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Email obfuscation — never in source HTML ----
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) {
    const p1 = 'sharon';
    const p2 = 'carriedinsight';
    const p3 = 'com';
    const addr = `${p1}@${p2}.${p3}`;
    emailLink.href = `mailto:${addr}`;
    emailLink.textContent = addr;
  }

  // ---- Nav scroll behavior ----
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

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

  // ---- Reveal on scroll ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ---- Hero stagger ----
  document.querySelectorAll('.hero-stagger').forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 140);
  });

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  // ---- Character counter / friction on context field ----
  const contextField = document.getElementById('context');
  const charHint = document.getElementById('char-hint');
  const MIN_CHARS = 40;

  if (contextField && charHint) {
    const update = () => {
      const len = contextField.value.trim().length;
      if (len === 0) {
        charHint.textContent = '';
      } else if (len < MIN_CHARS) {
        charHint.textContent = `${MIN_CHARS - len} more characters`;
        charHint.style.color = 'var(--slate-light)';
      } else {
        charHint.textContent = '✓';
        charHint.style.color = 'var(--bronze)';
      }
    };
    contextField.addEventListener('input', update);
  }

  // ---- Form submission ----
  const form = document.getElementById('inquiryForm');
  const formSuccess = document.querySelector('.form-success');
  const submitBtn = document.getElementById('submitBtn');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot?.value) return; // bot — silently drop

    // Friction: minimum context length
    const context = document.getElementById('context');
    if (context && context.value.trim().length < MIN_CHARS) {
      context.focus();
      charHint.textContent = `Please add a bit more — ${MIN_CHARS - context.value.trim().length} more characters`;
      charHint.style.color = 'var(--bronze)';
      return;
    }

    // Basic required field check
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) { field.focus(); valid = false; }
    });
    if (!valid) return;

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        formSuccess.classList.add('visible');
      } else {
        submitBtn.textContent = 'Send Inquiry';
        submitBtn.disabled = false;
        alert('Something went wrong. Please email sharon@carriedinsight.com directly.');
      }
    } catch {
      submitBtn.textContent = 'Send Inquiry';
      submitBtn.disabled = false;
    }
  });

});
