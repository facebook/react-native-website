document.addEventListener('DOMContentLoaded', () => {
  const steps = [
    'full',
    'icon',
    'mobile',
    'desktop',
    'laptop',
    'mobile2',
    'logo2',
    'full2',
  ];
  let i = 0;
  const logo = document.querySelector('.LogoAnimation');
  // logo.classList.add('mobile');

  setInterval(() => {
    const prev = steps[i];
    logo.classList.remove(prev);
    i = (i + 1) % steps.length;
    const current = steps[i];
    logo.classList.add(current);
  }, 2000);
});
