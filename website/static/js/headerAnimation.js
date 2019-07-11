document.addEventListener('DOMContentLoaded', () => {
  const steps = ['full', 'mobile', 'desktop', 'laptop', 'mobile2', 'full2'];
  const timeouts = [1250, 1500, 1500, 1500, 1500, 1250];
  let i = 0;
  const logo = document.querySelector('.LogoAnimation');

  function animateStep() {
    const prev = steps[i];
    logo.classList.remove(prev);
    i = (i + 1) % steps.length;
    const current = steps[i];
    const timeout = timeouts[i];
    logo.classList.add(current);

    setTimeout(animateStep, timeout);
  }

  setTimeout(() => {
    logo.classList.remove('init');
    animateStep();
  }, 2000);
});
