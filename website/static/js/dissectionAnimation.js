document.addEventListener('DOMContentLoaded', () => {
  let i = 0;
  const dissection = document.querySelector('.Dissection');
  const images = dissection.children;

  function animateExit() {
    i--;
    if (i >= 0) {
      images[i].classList.remove('visible');
      setTimeout(animateExit, 200);
    } else {
      i = 0;
      setTimeout(animateEnter, 1000);
    }
  }

  function animateEnter() {
    if (i < images.length) {
      images[i].classList.add('visible');
      i++;
      setTimeout(animateEnter, 1000);
    } else {
      setTimeout(animateExit, 500);
    }
  }

  setTimeout(() => {
    animateEnter();
  }, 0);
});
