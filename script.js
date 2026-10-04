document.getElementById('year').textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const metricCards = document.querySelectorAll('.metric-number');
const animateCounter = (element) => {
  const target = element.textContent;
  const number = parseInt(target.replace(/\D/g, ''), 10) || 0;
  const suffix = target.replace(/[0-9]/g, '');
  let current = 0;
  const step = Math.max(1, Math.ceil(number / 30));

  const timer = setInterval(() => {
    current += step;
    if (current >= number) {
      element.textContent = target;
      clearInterval(timer);
      return;
    }
    element.textContent = `${current}${suffix}`;
  }, 30);
};

metricCards.forEach((card) => {
  const rect = card.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    animateCounter(card);
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        const navItem = document.querySelector(`.main-nav a[href="#${id}"]`);
        if (navItem) {
          document.querySelectorAll('.main-nav a').forEach((link) => link.classList.remove('active'));
          navItem.classList.add('active');
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
