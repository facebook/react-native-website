(function() {
  document.addEventListener('DOMContentLoaded', init);

  function detectmob() {
    if(window.innerWidth <= 1024) {
      return true;
    } else {
      return false;
    }
  }

  function init() {
    var articleContainer = document.querySelector('.post article');
    if (articleContainer) {
      var el = document.createElement('div');
      el.innerHTML =
        '<a href="https://gio.ren/w/noqg4rRk" target="_blank" style="display:block;padding:12px;background-color: #eee;color:#666;"><span style="font-weight: bold;color: #05a5d1;">React 实战教程</span> 深入学习一线大厂必备前端技能，VIP 教程限时免费领取。 <span style="border:solid 1px #666; padding-left:4px; padding-right: 4px;padding-top:2px;padding-bottom:2px;margin-left: 8px;vertical-align:middle;">立即查看 &gt;</span></a>';

      articleContainer.insertBefore(el, articleContainer.firstChild);
    }

    var sideNav = document.querySelector('#docsNav nav');
    if (sideNav) {
      if (detectmob()) {

      } else {
        var el = document.createElement('div');
        el.innerHTML =
          '<a href="https://activity.huaweicloud.com/2019nov_promotion/index.html?&fromuser=aHc4NzgyMjgwMQ==&utm_source=aHc4NzgyMjgwMQ==&utm_medium=cps&utm_campaign=201905" target="_blank" style="display:block;padding:15px 25px 0 0"><img src="/img/thirdparty/huawei.jpg"></a>';
        sideNav.appendChild(el);
      }
    }

    if (location.href.indexOf('/getting-started') !== -1) {
      var onPageNav = document.querySelector('nav.onPageNav');
      if (onPageNav) {
        onPageNav.remove();
      }
    }
  }
})();
