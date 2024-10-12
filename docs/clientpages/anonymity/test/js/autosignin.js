window.addEventListener('DOMContentLoaded', () => {
    const secretUsername = localStorage.getItem('secretusername');
    const secretPassword = localStorage.getItem('secretpassword');
    const userNameSpan = document.getElementById('user-name'); // 获取用户状态的 span 元素
    const logoutLi = document.querySelector('li.logout a'); // 获取登出按钮的元素
    const userIdElement = document.getElementById('userId'); // 获取用于显示用户ID的元素
    const token = sessionStorage.getItem('token'); // 从 sessionStorage 中获取 token

    // 如果有 token，驗證 token
    if (token) {
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
                console.log('Token validated successfully');

                // 修改 <span id="user-name"> 尚未登入 </span> 內容為已登入
                if (userNameSpan) {
                    userNameSpan.textContent = '已登入';
                }

                // 修改 <li class="logout"><a href="#">登入</a></li> 內容為登出，並綁定登出事件
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
                throw new Error('Token validation failed.');
            }
        })
        .catch(error => {
            console.error('Error validating token:', error);
            // 如果驗證失敗或出錯，繼續檢查 secretusername 和 secretpassword
            attemptAutoSignin(secretUsername, secretPassword, userNameSpan, logoutLi, userIdElement);
        });
    } else {
        // 如果没有 token，繼續檢查 secretusername 和 secretpassword
        attemptAutoSignin(secretUsername, secretPassword, userNameSpan, logoutLi, userIdElement);
    }
});
