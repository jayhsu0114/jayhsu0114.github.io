window.addEventListener('DOMContentLoaded', () => {
    // 從 localStorage 中獲取 userId
    const userId = localStorage.getItem('userId');

    // 獲取 ID 為 "userId" 的 input 欄位
    const userIdInput = document.getElementById('userId');

    // 如果 userId 存在，將其設置為 input 欄位的值
    if (userId && userIdInput) {
        userIdInput.value = userId;
    }
});
