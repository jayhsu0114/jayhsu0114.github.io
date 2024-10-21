document.addEventListener("DOMContentLoaded", function() {
    function executeCode() {
        // 获取 sessionStorage 中的值
        var userId = localStorage.getItem('userId') || 'unknown';
        var route = sessionStorage.getItem('route') || 'unknown';
        var discount = sessionStorage.getItem('discount') || 'unknown';

        // 發送 POST 請求到伺服器
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-exchange/getqrcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                route: route,
                discount: discount
            })
        })
        .then(response => response.json())
        .then(data => {
            // 从伺服器回應中获取加密隨機代碼
            var encryptedCode = data.code;

            // 生成 QR code 的内容
            var qrContent = `userId=${userId}&route=${route}&discount=${discount}&key=${encryptedCode}`;
            
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

    // 初次執行代碼
    executeCode();

    // 每兩分鐘執行一次
    setInterval(executeCode, 120000);
});
