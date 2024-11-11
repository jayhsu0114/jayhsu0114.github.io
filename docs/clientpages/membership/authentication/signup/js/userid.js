// 假設 localStorage 中保存了 userId
let userId = localStorage.getItem('userId');

// 檢查 userId 是否存在
if (userId) {
    // 獲取 input 元素
    const inputElement = document.getElementById('schoolcode-suffix');
    
    // 填入 userId
    if (inputElement) {
        inputElement.value = userId;
    }
} else {
    console.log("userId not found in localStorage. Generating new userId...");
    
    // 生成新的 userId 並保存到 localStorage
    function generateUserId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newUserId = 'user_';
        for (let i = 0; i < 9; i++) {
            newUserId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return newUserId;
    }

    userId = generateUserId();
    localStorage.setItem('userId', userId);

    // 獲取 input 元素並填入新的 userId
    const inputElement = document.getElementById('schoolcode-suffix');
    if (inputElement) {
        inputElement.value = userId;
    }
}