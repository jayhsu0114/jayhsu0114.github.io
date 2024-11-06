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

                // 修改 <li class="logout"><a href="/clientpages/membership/authentication/signin">登入</a></li> 內容為登出
                if (logoutLi) {
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

                // 成功驗證後轉址
                window.location.href = '/clientpages/membership/research/choose';

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

// 嘗試自動登入函數
function attemptAutoSignin(secretUsername, secretPassword, userNameSpan, logoutLi, userIdElement) {
    // 檢查 localStorage 是否同時存在 secretusername 和 secretpassword
    if (secretUsername && secretPassword) {
        const payload = {
            secretusername: secretUsername,
            secretpassword: secretPassword
        };

        console.log('Sending autosignin JSON:', JSON.stringify(payload));

        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-autosignin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            const userId = data.userId;
            const token = data.token;

            localStorage.setItem('userId', userId);
            sessionStorage.setItem('token', token);

            console.log('Received data:', data);

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
                userIdElement.textContent = userId;
            }

            // 成功驗證後轉址
            window.location.href = '/clientpages/membership/research/choose';
        })
        .catch(error => {
            console.error('Error during autosignin:', error);
        });
    }
}
