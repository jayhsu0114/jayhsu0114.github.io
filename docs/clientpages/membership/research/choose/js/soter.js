// 檢查 sessionStorage 中是否有 token
const token = sessionStorage.getItem('token');

// 從 sessionStorage 中獲取 route 和 strategy 的值
const route = sessionStorage.getItem('route');
const strategy = sessionStorage.getItem('strategy');
const school = sessionStorage.getItem('school');

// 如果沒有 token，重定向到登入頁面
if (!token) {
    console.log('No token found. Redirecting to login page...');
    window.location.href = '/managementpages/authentication/signin'; // 調整為登入頁面的實際路徑
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
            
            // 檢查是否存在 route
            if (route) {
                console.log('Route found. Checking for strategy...');
                
                // 檢查是否存在 strategy
                if (strategy) {
                    console.log('Strategy found. Redirecting to strategy page...');
                    window.location.href = `/clientpages/membership/research/strategy/${strategy}`;
                } else {
                    // 沒有 strategy 值的情況下，更新頁面內容
                    console.log('No strategy found. Updating page content...');
                    
                    // 修改 <span id="user-name"> 內容為已登入
                    const userNameSpan = document.getElementById('user-name');
                    if (userNameSpan) {
                        userNameSpan.textContent = '已登入';
                    }

                    // 修改登出按鈕
                    const logoutElement = document.querySelector('li.logout a');
                    if (logoutElement) {
                        logoutElement.textContent = '登出';
                        logoutElement.href = '/clientpages/membership/authentication/signin'; // 更新為登出路徑
                    }

                    // 更新 userId 顯示
                    if (userIdElement) {
                        const userId = localStorage.getItem('userId');
                        if (userId) {
                            userIdElement.textContent = userId;
                        }
                    }
                }
            }
        } else {
            // 如果 token 驗證失敗，重定向到匿名頁面，依據 route 的值
            console.log('Token validation failed. Redirecting to anonymity page...');
            if (route) {
                const routeLowercase = route.toLowerCase();
                window.location.href = `https://anoncoultd.com/clientpages/anonymity/${routeLowercase}`;
            } else {
                // 如果無法獲取 route，跳轉到預設匿名頁面
                window.location.href = '/clientpages/anonymity'; // 根據實際情況調整匿名頁面的路徑
            }
        }
    })
    .catch(error => {
        console.error('Error validating token:', error);
        // 如果驗證過程中出現錯誤，重定向到登入頁面
        console.log('Error during token validation. Redirecting to login page...');
        window.location.href = '/managementpages/authentication/signin'; // 根據實際情況調整登入頁面的路徑
    });
}
