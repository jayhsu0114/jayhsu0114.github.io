function toggleMenu() {
    var menu = document.getElementById('side-menu');
    var overlay = document.getElementById('menu-overlay');

    if (menu.style.right === '-250px') {
        menu.style.right = '0';
        overlay.classList.add('active');  // 顯示背景遮罩
    } else {
        closeMenu();
    }
}

function closeMenu() {
    var menu = document.getElementById('side-menu');
    var overlay = document.getElementById('menu-overlay');

    menu.style.right = '-250px';
    overlay.classList.remove('active');  // 隱藏背景遮罩
}
