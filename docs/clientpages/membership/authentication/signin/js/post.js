function handleSubmit(event) {
    event.preventDefault(); // 防止表單提交預設行為

    // Disable all buttons immediately
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const autologin = document.getElementById('autoLogin').checked;

    // 準備要發送的資料
    const payload = { username, password, autologin: autologin };

    // 輸出傳送的 JSON 內容
    console.log('Submitting JSON:', JSON.stringify(payload));

    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-humansignin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // 確保屬性名稱一致
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
        const userId = data.userId;

        // 將 token 存入 sessionStorage
        sessionStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // 檢查是否存在 secretusername 和 secretpassword，並存入 localStorage
        if (data.secretusername) {
            localStorage.setItem('secretusername', data.secretusername);
        }
        if (data.secretpassword) {
            localStorage.setItem('secretpassword', data.secretpassword);
        }

        // 獲取並處理 school 資訊（轉成全小寫）
        const school = data.school ? data.school.toLowerCase() : '';

        // 在控制台輸出所有返回的數據
        console.log('Received data:', data);
        alert('登入成功');

        // 檢查 sessionStorage 中是否有 nextpage，且值為 strategychoose
        const nextpage = sessionStorage.getItem('nextpage');
        if (nextpage === 'strategychoose') {
            // 刪除 nextpage
            sessionStorage.removeItem('nextpage');
            // 跳轉到 /clientpages/membership/research/choose
            window.location.href = '/clientpages/membership/research/choose';
        } else if (school) {
            // 否則，跳轉到與 school 相關的 URL
            window.location.href = `https://anoncoultd.com/clientpages/anonymity/${school}`;
        }

    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('登入失敗：無效的帳號或密碼。');
        // Re-enable all buttons on error
        buttons.forEach(button => button.disabled = false);
    });
}
