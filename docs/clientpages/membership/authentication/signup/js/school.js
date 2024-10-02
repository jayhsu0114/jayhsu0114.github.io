// 在網頁載入時執行
window.onload = function() {
    // 讀取 sessionStorage 中的 school 值
    const schoolValue = sessionStorage.getItem('school');
    
    // 如果存在 school 值，將其填入 id 為 "schoolcode-prefix" 的 input 中
    if (schoolValue) {
        document.getElementById('schoolcode-prefix').value = schoolValue;
    }
};
