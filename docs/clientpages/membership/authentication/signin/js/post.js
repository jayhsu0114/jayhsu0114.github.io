function handleSubmit(event) {
    event.preventDefault(); // 防止表單提交預設行為

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const autologin = document.getElementById('autoLogin').checked;

    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-humansignin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, autoLogin: autologin }), // 确保属性名称一致
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // 如果回應是成功的，返回 JSON 格式的數據
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        // 獲取後端返回的 JWT token
        const token = data.token;

        // 將 token 存入 localStorage
        localStorage.setItem('token', token);

        // 在控制台輸出所有返回的數據
        console.log(data);

        // 根據後端返回的重定向路徑進行跳轉（如果存在 redirectUrl）
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('登入失敗：無效的帳號或密碼。');
    });
}
