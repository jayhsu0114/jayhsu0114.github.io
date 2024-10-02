// 生成9位隨機英數字大小寫混合的亂碼
function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = 'user_';
    for (let i = 0; i < 9; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}

// 設置 cookie 的函數
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 取得 cookie 的函數
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// 網頁載入後執行
window.onload = function() {
    let userId = getCookie("userId");
    
    // 如果cookie中沒有userId，生成一個並存入cookie
    if (!userId) {
        userId = generateRandomId();
        setCookie("userId", userId, 365); // 設置cookie保存365天
    }

    // 將userId填入schoolcode-suffix的input內
    document.getElementById('schoolcode-suffix').value = userId;
};
