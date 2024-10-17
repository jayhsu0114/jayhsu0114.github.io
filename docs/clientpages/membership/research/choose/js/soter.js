// 檢查 sessionStorage 中是否有 token
const token = sessionStorage.getItem('token');

// 從 sessionStorage 中獲取 route 和 strategy 的值
const route = sessionStorage.getItem('route');
const strategy = sessionStorage.getItem('strategy');

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
            
            // 檢查是否存在 route
            if (route) {
                console.log('Route found. Checking for strategy...');
                
                // 檢查是否存在 strategy
                if (strategy) {
                    console.log('Strategy found. Redirecting to strategy page...');
                    window.location.href = `/clientpages/membership/research/strategy/${strategy}`;
                } else {
                    console.log('No strategy found. No further actions.');
                }
            }
        } else {
            // 如果 token 驗證失敗，重定向到匿名頁面，依據 route 的值
            console.log('Token validation failed. Redirecting to anonymity page...');
            if (route) {
                const routeLowercase = route.toLowerCase();
                window.location.href = '/clientpages/membership/authentication/signin';
            } else {
                // 如果無法獲取 route，跳轉到預設匿名頁面
                alert('管道來源不明，請截圖私訊粉絲專頁處理')
                window.location.href = '/clientpages/wrongpage'; // 根據實際情況調整匿名頁面的路徑
            }
        }
    })
    .catch(error => {
        console.error('Error validating token:', error);
        // 如果驗證過程中出現錯誤，重定向到登入頁面
        console.log('Error during token validation. Redirecting to login page...');
        window.location.href = '/clientpages/membership/authentication/signin'; // 根據實際情況調整登入頁面的路徑
    });
}
