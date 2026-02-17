const revealItems = document.querySelectorAll('.reveal');
const counter = document.querySelector('[data-target]');
const themeBtn = document.getElementById('themeBtn');
const hintText = document.getElementById('hintText');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 80}ms`;
  revealObserver.observe(item);
});

function animateCounter(el) {
  const target = Number(el.dataset.target);
  const duration = 900;
  const start = performance.now();

  function step(time) {
    const progress = Math.min((time - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

if (counter) {
  animateCounter(counter);
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('alt-theme');
  hintText.textContent = document.body.classList.contains('alt-theme')
    ? 'Акцент сменен: теперь стиль с тёплым настроением.'
    : 'Акцент сброшен: вернулись к холодной палитре.';
});
