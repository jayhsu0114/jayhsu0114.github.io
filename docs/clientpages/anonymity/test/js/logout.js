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
}
