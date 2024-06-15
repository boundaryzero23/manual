document.addEventListener('DOMContentLoaded', function() {
  // 관리자, 사용자 탭메뉴
  const tabs = document.querySelectorAll('.tab');
  const menus = document.querySelectorAll('.tab-content');
  const contents = document.querySelectorAll('.tab-cont');

  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs and contents
          tabs.forEach(t => t.classList.remove('active'));
          menus.forEach(c => c.classList.remove('active'));
          contents.forEach(c => c.classList.remove('active'));

          // Add active class to the clicked tab and corresponding content
          tab.classList.add('active');
          const target = tab.getAttribute('data-target');
          document.getElementById(target).classList.add('active');
          document.getElementById(target + '-area').classList.add('active');
      });
  });

  var firstMenu = document.querySelector('.menu > li:first-child');
  var menuItems = document.querySelectorAll('.menu > li > a');
  var submenuItems = document.querySelectorAll('.menu li ul li a');
  var menuLis = document.querySelectorAll('.menu > li');

  // LEFT MENU
  // 초기 로드 시 첫 번째 1depth 메뉴 열기
  firstMenu.classList.add('active', 'current');
  firstMenu.querySelector('ul').style.maxHeight = '500px';

  menuItems.forEach(function(menuItem) {
      menuItem.addEventListener('click', function(event) {
          event.preventDefault();
          var parentLi = this.parentElement;

          // 모든 메뉴 닫기 및 current 클래스 제거
          menuLis.forEach(function(menuLi) {
              menuLi.classList.remove('active', 'current');
              menuLi.querySelector('ul').style.maxHeight = '0';
          });

          // 클릭된 메뉴 열기 및 current 클래스 추가
          parentLi.classList.add('active', 'current');
          parentLi.querySelector('ul').style.maxHeight = '500px';

          // 첫 번째 서브메뉴 활성화
          var firstSubmenu = parentLi.querySelector('ul li:first-child');
          if (firstSubmenu) {
              firstSubmenu.classList.add('active');
          }
      });
  });

  submenuItems.forEach(function(submenuItem) {
      submenuItem.addEventListener('click', function(event) {
          event.stopPropagation(); // 부모 메뉴가 닫히지 않도록 이벤트 전파 방지
          var parentLi = this.closest('li');

          // 모든 메뉴 닫기 및 current 클래스 제거
          menuLis.forEach(function(menuLi) {
              menuLi.classList.remove('active', 'current');
              menuLi.querySelectorAll('ul li').forEach(function(subLi) {
                  subLi.classList.remove('active');
              });
              menuLi.querySelector('ul').style.maxHeight = '0';
          });

          // 부모 메뉴 열기 및 current 클래스 추가
          var topMenuLi = parentLi.closest('.menu > li');
          topMenuLi.classList.add('active', 'current');
          topMenuLi.querySelector('ul').style.maxHeight = '500px';

          // 클릭된 서브메뉴 활성화
          parentLi.classList.add('active');
      });
  });

});