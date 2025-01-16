// 提交表單時處理提交事件
function handleSubmit(event) {
    event.preventDefault(); // 阻止表單的預設提交行為

    // 獲取表單中的所有輸入值
    const username = document.getElementById('username').value;
    const userId = document.getElementById('userId').value;
    const birthdayYear = document.getElementById('birthday-information-year').value;
    const birthdayMonth = document.getElementById('birthday-information-month').value;
    const birthdayDate = document.getElementById('birthday-information-date').value;

    // 構建一個包含這些輸入值的物件
    const payload = {
        username: username,
        userId: userId,
        birthdayYear: birthdayYear,
        birthdayMonth: birthdayMonth,
        birthdayDate: birthdayDate
    };

    console.log("Sending data:", payload); // 輸出要發送的資料

    // 使用 fetch 發送 POST 請求到後端
    fetch('https://google-sheets-proxy-112185679321.us-central1.run.app/membership-forgetpassword/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // 將資料轉換為 JSON 格式
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // 解析 JSON 格式的回應
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        // 根據回應中的 success 字段決定是否成功
        if (data.success) {
            console.log('Success:', data);
            // 將 userId 存入 localStorage
            localStorage.setItem('userId', data.userId);
            // 驗證成功後跳轉到修改密碼頁面
            window.location.href = '/clientpages/membership/authentication/changepassword';
        } else {
            alert(`驗證失敗：${data.message}`);
            console.log('Error:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error); // 如果發生錯誤，輸出錯誤訊息
        alert('提交失敗，請稍後再試。');
    });
} 
