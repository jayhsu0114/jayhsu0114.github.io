document.addEventListener("DOMContentLoaded", function() {
    function executeCode() {
        // 获取 sessionStorage 中的值
        var userId = localStorage.getItem('userId') || 'unknown';
        var route = sessionStorage.getItem('route') || 'unknown';
        var strategy = sessionStorage.getItem('strategy') || 'unknown';

        // 發送 POST 請求到伺服器
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-exchange/finish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                route: route,
                strategy: strategy
            })
        })
        .then(response => response.json())
        .then(data => {
            // 根據伺服器回應進行跳轉
            if (data.code === '已完成') {
                window.location.href = '/clientpages/membership/research/finish/correct';
            } else if (data.code === '錯誤') {
                window.location.href = '/clientpages/membership/research/finish/incorrect';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // 初次執行代碼
    executeCode();

    // 每10秒執行一次
    setInterval(executeCode, 5000);
});
