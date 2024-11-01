document.addEventListener("DOMContentLoaded", function() {
    function postUserIdAndProceed() {
        // 从 local storage 获取 userId
        var userId = localStorage.getItem('userId') || 'unknown';

        // 发起请求到指定的 URL
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-anticheating/key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        })
        .then(response => response.text())  // 获取响应的文本内容
        .then(data => {
            if (data === '已完成') {
                // 如果收到「已完成」，跳转到指定页面
                window.location.href = '/clientpages/membership/research/finish/correct';
            } else if (data === 'no data') {
                // 如果收到 "no data"，继续接下来的动作
                executeCode();
                // 每两分钟执行一次
                setInterval(executeCode, 120000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function executeCode() {
        // 获取 sessionStorage 中的值
        var userId = localStorage.getItem('userId') || 'unknown';
        var route = sessionStorage.getItem('route') || 'unknown';
        var strategy = sessionStorage.getItem('strategy') || 'unknown';

        // 發送 POST 請求到伺服器
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-exchange/getqrcode', {
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
            // 从伺服器回應中获取加密隨機代碼
            var encryptedCode = data.code;

            // 生成 QR code 的内容
            var qrContent = `https://anoncoultd.com/clientpages/membership/research/confirm?userId=${userId}&route=${route}&strategy=${strategy}&key=${encryptedCode}`;
            
            // 使用 QRious 生成 QR code
            var qr = new QRious({
                element: document.getElementById('qrcode'),
                value: qrContent,
                size: 200,  // QR code 的大小
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // 初次发起 userId 验证请求
    postUserIdAndProceed();
});
