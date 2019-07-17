document.addEventListener('DOMContentLoaded', () => {
  const dissection = document.querySelector('.Dissection');
  const images = dissection.children;
  const numImages = images.length;

  function clamp(val, min, max) {
    return Math.min(max, Math.max(min, val));
  }

  function getImagePercent(index, scrollPercent) {
    const start = index / numImages;
    const imgPercent = clamp((scrollPercent - start) * numImages, 0, 1);
    return imgPercent;
  }

  window.addEventListener('scroll', e => {
    const elPos = dissection.getBoundingClientRect().top;
    const screenPercent = 1 - clamp((elPos - 150) / window.innerHeight, 0, 1);
    requestAnimationFrame(() => {
      for (let i = 0; i < numImages; i++) {
        const imgPercent = getImagePercent(i, screenPercent);
        images[i].style.opacity = imgPercent;
        const translation = 40 * (1 - imgPercent);
        images[i].style.left = `${translation}px`;
      }
    });
  });
});
