    // 檢查 localStorage 中是否有 token
    const token = localStorage.getItem('token');
    
    if (!token) {
        // 如果沒有 token，重定向到登入頁面
        console.log('No token found. Redirecting to login page...');
        window.location.href = '/managementpages/authentication/signin'; // 根據實際情況調整登入頁面的路徑
    } else {
        // 如果有 token，將 token 放入 Authorization header 中
        console.log('Token found. Verifying token...');
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/soter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.ok) {
                // 如果 token 驗證成功，可以繼續訪問此頁面的數據
                console.log('Token validated successfully');
            } else {
                // 如果 token 驗證失敗，重定向到登入頁面
                console.log('Token validation failed. Redirecting to login page...');
                window.location.href = '/managementpages/authentication/signin'; // 根據實際情況調整登入頁面的路徑
            }
        })
        .catch(error => {
            console.error('Error validating token:', error);
            // 如果驗證過程中出現錯誤，重定向到登入頁面
            console.log('Error during token validation. Redirecting to login page...');
            window.location.href = '/managementpages/authentication/signin'; // 根據實際情況調整登入頁面的路徑
        });
    }