// 檢查 sessionStorage 中是否有 token
const token = sessionStorage.getItem('token');

// 從 sessionStorage 中獲取 school 的值
const school = sessionStorage.getItem('school');

// 從 localStorage 中獲取 userId 的值
const userId = localStorage.getItem('userId');

// 如果沒有 token，顯示提示訊息
if (!token) {
    console.log('No token found. ');
} else {
    // 如果有 token，將 token 放入 Authorization header 中進行驗證
    console.log('Token found. Verifying token...');
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-historysearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            school: school,
            userId: userId
        })
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        if (data.ok) {
            // 如果 token 驗證成功，繼續訪問頁面
            console.log('Token validated successfully');
        } else {
            // 如果 token 驗證失敗，顯示提示訊息
            console.log('Token validation failed. Alerting user to contact support...');
            alert('錯誤');
        }
    })
    .catch(error => {
        console.error('Error validating token:', error);
        // 如果驗證過程中出現錯誤，顯示提示訊息
        alert('錯誤');
    });
}
