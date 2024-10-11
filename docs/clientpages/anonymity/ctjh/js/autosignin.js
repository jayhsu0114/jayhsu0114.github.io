window.addEventListener('DOMContentLoaded', () => {
    const secretUsername = localStorage.getItem('secretusername');
    const secretPassword = localStorage.getItem('secretpassword');
    const userNameSpan = document.getElementById('user-name'); // 获取用户状态的 span 元素
    const logoutLi = document.querySelector('li.logout a'); // 获取登出按钮的元素
    const userIdElement = document.getElementById('userId'); // 获取用于显示用户ID的元素

    // 檢查 localStorage 是否同時存在 secretusername 和 secretpassword
    if (secretUsername && secretPassword) {
        // 準備要發送的資料
        const payload = {
            secretusername: secretUsername,
            secretpassword: secretPassword
        };

        // 輸出傳送的 JSON 內容到控制台
        console.log('Sending autosignin JSON:', JSON.stringify(payload));

        // 發送 POST 請求
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-autosignin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // 傳送加密的 secretusername 和 secretpassword
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // 如果回應成功，返回 JSON 格式的數據
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            // 獲取返回的 userId 和 token，並將它們分別存入 localStorage 和 sessionStorage
            const userId = data.userId;
            const token = data.token;

            // 存儲 userId 到 localStorage
            localStorage.setItem('userId', userId);

            // 存儲 token 到 sessionStorage
            sessionStorage.setItem('token', token);

            // 在控制台輸出所有返回的數據
            console.log('Received data:', data);

            // 修改 <span id="user-name"> 尚未登入 </span> 內容為已登入
            if (userNameSpan) {
                userNameSpan.textContent = '已登入';
            }

            // 修改 <li class="logout"><a href="/clientpages/membership/authentication/signin">登入</a></li> 內容為登出
            if (logoutLi) {
                logoutLi.textContent = '登出';
                logoutLi.href = '/clientpages/membership/authentication/logout'; // 可更改为登出功能的实际路径
            }

            // 將 <li><a id="userId">使用者代碼</a></li> 改為 localStorage 中的 userId
            if (userIdElement) {
                userIdElement.textContent = userId;
            }
        })
        .catch(error => {
            console.error('Error during autosignin:', error);
        });
    }
});
