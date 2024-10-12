// logout.js
function handleLogout(event) {
    event.preventDefault(); // 阻止預設的連結行為

    // 刪除 sessionStorage 裡的 token
    sessionStorage.removeItem('token');

    // 修改 <span id="user-name"> 內容為 "尚未登入"
    const userNameSpan = document.getElementById('user-name');
    if (userNameSpan) {
        userNameSpan.textContent = '尚未登入';
    }

    // 修改 <a id="userId"> 內容為 "使用者代碼"
    const userIdElement = document.getElementById('userId');
    if (userIdElement) {
        userIdElement.textContent = '使用者代碼';
    }

    // 修改登出按鈕為登入，並設置連結到登入頁面
    const logoutLi = document.querySelector('li.logout a');
    if (logoutLi) {
        logoutLi.textContent = '登入'; // 修改按鈕文字為 "登入"
        logoutLi.href = '/clientpages/membership/authentication/signin'; // 設置連結到登入頁面
    }

    // 可選：也可以自動跳轉到登入頁面
    // window.location.href = '/clientpages/membership/authentication/signin';
}
