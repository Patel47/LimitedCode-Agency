const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

menuButton.addEventListener('click', () => {
  const open = menuButton.classList.toggle('active');
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', open);
});

mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.classList.remove('active');
  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const duration = 1300;
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(counter);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(counter => counterObserver.observe(counter));

const processTrack = document.querySelector('.process-track');
const processObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) processTrack.classList.add('active');
}, { threshold: 0.4 });
processObserver.observe(processTrack);

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('open');
    });
    item.classList.toggle('open');
  });
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const status = event.currentTarget.querySelector('.form-status');
  const name = new FormData(event.currentTarget).get('name').trim().split(' ')[0];
  status.textContent = `Thanks, ${name}! Your enquiry is ready to send. Connect this form to your preferred inbox service to go live.`;
});

document.getElementById('year').textContent = new Date().getFullYear();
