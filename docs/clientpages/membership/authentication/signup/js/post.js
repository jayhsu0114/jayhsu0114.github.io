document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表單默認提交

    // 收集表單數據，按照順序
    const formData = {
        schoolcode_prefix: document.getElementById('schoolcode-prefix').value,
        schoolcode: document.getElementById('schoolcode').value,
        schoolcode_suffix: document.getElementById('schoolcode-suffix').value,
        school_information_grade: document.getElementById('school-information-grade').value,
        school_information_class: document.getElementById('school-information-class').value,
        school_information_number: document.getElementById('school-information-number').value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        instagram: document.getElementById('instagram').value,
        password: document.getElementById('password').value,
        passwordconfirm: document.getElementById('passwordconfirm').value,
    };

    // 獲取提交按鈕
    const submitButton = document.getElementById('signup');

    // 禁用提交按鈕
    submitButton.disabled = true;

    // 發送 POST 請求
    fetch('https://google-sheets-proxy-112185679321.us-central1.run.app/membership-signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('網絡響應異常');
        }
        return response.json();
    })
    .then(data => {
        // 根據返回的數據處理相應的消息
        if (data.success) {
            // 成功添加數據的情況，直接跳轉到指定頁面
            window.location.href = 'https://anoncoultd.com/clientpages/membership/authentication/signin';
        } else {
            // 如果是失敗消息（如學號已存在）
            console.log('失敗:', data.message);
            alert(data.message); // 提示錯誤消息
        }
    })
    .catch(error => {
        console.error('發生錯誤:', error);
        alert('發生錯誤，請稍後再試。'); // 提示網絡錯誤消息
    })
    .finally(() => {
        // 無論成功或失敗，重新啟用按鈕
        submitButton.disabled = false;
    });
});
