/* ============================================================
   WALELA LINK SERVICES — Main JavaScript
   Shared across all pages
   ============================================================ */

/* ─── Page Loader ───────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 1000);
});

/* ─── Sticky Nav Shadow ─────────────────────────────────── */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ─── Mobile Hamburger ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate bars
    const bars = hamburger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const bars = hamburger.querySelectorAll('span');
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });
}

/* ─── Scroll Fade-Up Animations ────────────────────────── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement?.querySelectorAll('.fade-up') || [];
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.fade-up').forEach(el => {
  fadeObserver.observe(el);
});

/* ─── Toast Notification ────────────────────────────────── */
function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove('show'), duration);
}

// Expose globally
window.showToast = showToast;

/* ─── Smooth Anchor Scroll ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── Input Focus Effects ───────────────────────────────── */
document.querySelectorAll('input, textarea, select').forEach(el => {
  el.addEventListener('focus', () => {
    el.parentElement.classList?.add('focused');
  });
  el.addEventListener('blur', () => {
    el.parentElement.classList?.remove('focused');
  });
});

/* ─── Hero Card Tilt (homepage only) ───────────────────── */
const heroCardMain = document.querySelector('.hero-card-main');
if (heroCardMain) {
  const cardStack = heroCardMain.closest('.hero-card-stack');
  if (cardStack) {
    cardStack.addEventListener('mousemove', (e) => {
      const rect = cardStack.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroCardMain.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    cardStack.addEventListener('mouseleave', () => {
      heroCardMain.style.transform = '';
    });
  }
}

/* ─── Active Nav Link Highlight ─────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
  const href = link.getAttribute('href')?.split('/').pop();
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

/* ─── Service card hover ripple ─────────────────────────── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function() {
    const link = this.querySelector('.service-card-link');
    if (link) link.click();
  });
});