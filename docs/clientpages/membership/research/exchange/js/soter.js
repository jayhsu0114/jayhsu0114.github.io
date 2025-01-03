// 檢查 sessionStorage 中是否有 token
const token = sessionStorage.getItem('token');

// 如果沒有 token，重定向到登入頁面
if (!token) {
    console.log('No token found. Redirecting to login page...');

    window.location.href = '/clientpages/membership/authentication/signin'; // 調整為登入頁面的實際路徑
} else {
    // 如果有 token，將 token 放入 Authorization header 中進行驗證
    console.log('Token found. Verifying token...');
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-soter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            // 如果 token 驗證成功，繼續訪問頁面
            console.log('Token validated successfully');
            const userNameSpan = document.getElementById('user-name');
            const logoutLi = document.querySelector('.logout a');
            const userIdElement = document.getElementById('userId');

            // 修改 <span id="user-name"> 尚未登入 </span> 內容為已登入
            if (userNameSpan) {
                userNameSpan.textContent = '已登入';
            }

            // 修改 <li class="logout"><a href="/clientpages/membership/authentication/signin">登入</a></li> 內容為登出
            if (logoutLi) {
                logoutLi.textContent = '登出';
                logoutLi.href = '#'; // 改為 #
                logoutLi.addEventListener('click', handleLogout); // 绑定登出事件
            }

            // 將 <li><a id="userId">使用者代碼</a></li> 改為 localStorage 中的 userId
            if (userIdElement) {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    userIdElement.textContent = userId;
                }
            }
        } else {
            // 如果 token 驗證失敗，重定向到登入頁面
            console.log('Token validation failed. Redirecting to login page...');
            sessionStorage.setItem('nextpage', 'anonymityhistory');
            window.location.href = '/clientpages/membership/authentication/signin';
        }
    })
    .catch(error => {
        console.error('Error validating token:', error);
        // 如果驗證過程中出現錯誤，重定向到登入頁面
        console.log('Error during token validation. Redirecting to login page...');
        sessionStorage.setItem('nextpage', 'anonymityhistory');
        window.location.href = '/clientpages/membership/authentication/signin';
    });
}

function handleLogout() {
    // 清除 token 和 userId
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('nextpage');
    // 重定向到登入頁面
    window.location.href = '/clientpages/membership/authentication/signin';
}
