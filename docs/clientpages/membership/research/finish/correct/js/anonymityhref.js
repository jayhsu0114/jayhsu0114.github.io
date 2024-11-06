window.addEventListener('DOMContentLoaded', () => {
    // 從 sessionStorage 中獲取 school 的值
    const school = sessionStorage.getItem('school');

    // 如果 school 存在，將其轉為小寫，並動態設置 <a> 標籤的 href 屬性
    if (school) {
        const schoolLowercase = school.toLowerCase();
        const anonymousLink = document.getElementById('anonymousLink');
        anonymousLink.href = `https://anoncoultd.com/clientpages/anonymity/${schoolLowercase}`;
    } else {
        console.error('School not found in sessionStorage');
    }
});