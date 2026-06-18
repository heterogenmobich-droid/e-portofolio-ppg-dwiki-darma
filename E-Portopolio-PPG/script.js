// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '68px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = '#fff';
  navLinks.style.padding = '16px 24px 24px';
  navLinks.style.borderBottom = '1px solid #e5e7eb';
  navLinks.style.boxShadow = '0 8px 24px rgba(0,0,0,.08)';
  navLinks.style.zIndex = '99';
});

// ===== DROPDOWN MULTI-CLICK SELECTION (TOUCH & CLICK SAFETY) =====
const dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Toggle active state for current dropdown
    const isActive = dropdown.classList.contains('active-dropdown');
    
    // Close other dropdowns
    dropdowns.forEach(d => d.classList.remove('active-dropdown'));
    
    if (!isActive) {
      dropdown.classList.add('active-dropdown');
    }
  });
});

// Close dropdowns if clicking anywhere outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    dropdowns.forEach(d => d.classList.remove('active-dropdown'));
  }
});

// ===== AOS (Animate On Scroll) =====
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => el.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(el => observer.observe(el));
}
initAOS();

// ===== COMPETENCY BAR ANIMATION =====
function animateBars() {
  const fills = document.querySelectorAll('.comp-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.style.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => {
    const target = f.style.width;
    f.style.width = '0';
    observer.observe(f);
    setTimeout(() => { f.style.width = target; }, 300);
  });
}
animateBars();

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--purple-main)' : '';
    a.style.fontWeight = a.getAttribute('href') === `#${current}` ? '700' : '';
  });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
if (form && sendBtn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendBtn.textContent = '✅ Terkirim!';
    sendBtn.style.background = 'linear-gradient(135deg,#059669,#047857)';
    setTimeout(() => {
      sendBtn.textContent = 'Kirim Pesan 📨';
      sendBtn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      const num = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      let start = 0;
      const step = num / 40;
      const timer = setInterval(() => {
        start += step;
        if (start >= num) { el.textContent = num + suffix; clearInterval(timer); }
        else el.textContent = Math.floor(start) + suffix;
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  stats.forEach(s => observer.observe(s));
}
animateCounters();

