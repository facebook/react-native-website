import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (() => {
  const isReady =
    ExecutionEnvironment.canUseDOM && ExecutionEnvironment.canUseEventListeners;
  if (isReady) {
    window.addEventListener('load', () => {
      if (!window.location.hash) {
        return;
      }

      const ref = document.getElementById(window.location.hash.slice(1));
      if (!ref) {
        return;
      }

      ref.scrollIntoView();
    });
  }
})();
