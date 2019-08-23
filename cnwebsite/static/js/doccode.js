(function() {
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var container = document.querySelector('.post article');
    if (!container) {
      return;
    }
    var el = document.createElement('div');
    el.innerHTML =
      '<a href="https://gio.ren/w/noqg4rRk" target="_blank" style="display:block;padding:12px;background-color: #eee;color:#666;"><span style="font-weight: bold;color: #05a5d1;">React 实战教程</span> 深入学习一线大厂必备前端技能，VIP 教程限时免费领取。 <span style="border:solid 1px #666; padding-left:4px; padding-right: 4px;padding-top:2px;padding-bottom:2px;margin-left: 8px;vertical-align:middle;">立即查看 &gt;</span></a>';

    container.insertBefore(el, container.firstChild);
  }
})();
