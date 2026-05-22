// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  burger.classList.toggle('active');
});
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('active');
  });
});

// ===== SCROLL TO TOP =====
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== ANIMATE ON SCROLL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-up, .animate-right').forEach(el => {
  observer.observe(el);
});

// ===== COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('ru-RU');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('bookingForm');
const toast = document.getElementById('toast');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    toast.classList.add('show');
    bookingForm.reset();
    setTimeout(() => toast.classList.remove('show'), 4000);
  });
}

// ===== PHONE MASK =====
const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1);
    let result = '+7';
    if (val.length > 0) result += ' (' + val.slice(0, 3);
    if (val.length >= 3) result += ') ' + val.slice(3, 6);
    if (val.length >= 6) result += '-' + val.slice(6, 8);
    if (val.length >= 8) result += '-' + val.slice(8, 10);
    e.target.value = result;
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
