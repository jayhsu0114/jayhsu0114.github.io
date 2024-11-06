function spinWheel() {
    // Check if strategy already exists in session storage
    if (sessionStorage.getItem('strategy')) {
        // Redirect to membership research exchange page
        window.location.href = '/clientpages/membership/research/exchange';
        return;
    }

    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;

    // Get token, route, and userId from storage
    const token = sessionStorage.getItem('token');
    const route = sessionStorage.getItem('route');
    const userId = localStorage.getItem('userId');

    // Prepare the request payload
    const payload = {
        route: route,
        userId: userId,
    };

    // Set headers with token
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');

    // Send request to the server
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-strategy/drawing', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            // Store discount message in sessionStorage
            sessionStorage.setItem('strategy', data.message);

            // Play wheel animation
            const randomRotation = Math.floor(Math.random() * 3600) + 360; // 讓轉盤隨機旋轉 10-30 圈
            wheel.style.transform = `rotate(${randomRotation}deg)`;

            setTimeout(() => {
                const discountAmount = data.message.match(/\d+/)[0];
                alert(`您已獲得${discountAmount}元折扣券`);
                spinButton.disabled = false;
                // Redirect to membership research exchange page
                window.location.href = '/clientpages/membership/research/exchange';
            }, 3000); // 動畫持續3秒後顯示結果
        })
        .catch(error => {
            console.error('Error:', error);
            spinButton.disabled = false;
        });
}
