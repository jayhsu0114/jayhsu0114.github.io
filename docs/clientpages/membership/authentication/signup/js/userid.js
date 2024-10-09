// 假设 localStorage 中保存了 userId
let userId = localStorage.getItem('userId');

// 检查 userId 是否存在
if (userId) {
    // 获取 input 元素
    const inputElement = document.getElementById('schoolcode-suffix');
    
    // 填入 userId
    if (inputElement) {
        inputElement.value = userId;
    }
} else {
    console.log("userId not found in localStorage.");
}
