const schoolCodeInput = document.getElementById('schoolcode');
const schoolCodeerrorMessage = document.getElementById('schoolcode-error');

// 監聽 input 事件
schoolCodeInput.addEventListener('input', function() {
    const value = schoolCodeInput.value;

    // 檢查是否為 10 位數字且以 8 開頭
    if (!/^(8\d{9})$/.test(value)) {
        schoolCodeerrorMessage.style.display = 'block'; // 顯示錯誤訊息
    } else {
        schoolCodeerrorMessage.style.display = 'none'; // 隱藏錯誤訊息
    }
});

