document.addEventListener("DOMContentLoaded", function() {
    function postUserIdAndProceed() {
        // 從 local storage 獲取 userId
        var userId = localStorage.getItem('userId') || 'unknown';

        // 發起訊消到指定的 URL
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-anticheating/key', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        })
        .then(response => response.text())  // 獲取回應的文本內容
        .then(data => {
            if (data === '已完成') {
                // 如果收到「已完成」，跳轉到指定頁面
                window.location.href = '/clientpages/membership/research/finish/correct';
            } else {
                // 如果不是「已完成」，繼續採取下一步動作
                executeCode();
                // 每1分鐘執行一次
                setInterval(executeCode, 60000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function executeCode() {
        // 獲取 sessionStorage 中的值
        var userId = localStorage.getItem('userId') || 'unknown';
        var route = sessionStorage.getItem('route') || 'unknown';
        var strategy = sessionStorage.getItem('strategy') || 'unknown';

        // 顯示 session storage 的值在 QR CODE 上方
        document.getElementById('session-info').innerText = `${strategy}`;

        // 發送 POST 訊消到伺服器
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
            // 從伺服器回應中獲取加密隨機代碼
            var encryptedCode = data.code;

            // 產生 QR code 的內容
            var qrContent = `https://anoncoultd.com/clientpages/membership/research/confirm?userId=${userId}&route=${route}&strategy=${strategy}&key=${encryptedCode}`;
            
            // 使用 QRious 產生 QR code
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

    // 初次發起 userId 驗證訊消
    postUserIdAndProceed();
});
