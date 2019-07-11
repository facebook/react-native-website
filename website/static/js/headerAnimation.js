document.addEventListener('DOMContentLoaded', () => {
  const steps = ['full', 'mobile', 'desktop', 'laptop', 'mobile2', 'full2'];
  let i = 0;
  const logo = document.querySelector('.LogoAnimation');

  setInterval(() => {
    logo.classList.remove('init');
    const prev = steps[i];
    logo.classList.remove(prev);
    i = (i + 1) % steps.length;
    const current = steps[i];
    logo.classList.add(current);
  }, 1500);
});
