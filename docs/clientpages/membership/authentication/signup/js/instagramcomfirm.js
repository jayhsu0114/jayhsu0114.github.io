const instagramInput = document.getElementById('instagram');
const instagramerrorMessage = document.getElementById('instagram-error');

// 監聽 input 事件
instagramInput.addEventListener('input', function() {
    const value = instagramInput.value;

    // 檢查是否只包含英文、數字、. 和 _
    const regex = /^[a-zA-Z0-9._]+$/; // 定義正規表達式

    if (!regex.test(value)) {
        instagramerrorMessage.style.display = 'block'; // 顯示錯誤訊息
    } else {
        instagramerrorMessage.style.display = 'none'; // 隱藏錯誤訊息
    }
});
