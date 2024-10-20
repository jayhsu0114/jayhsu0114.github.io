function spinWheel() {
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
            sessionStorage.setItem('discount', data.message);

            // Play wheel animation
            const randomRotation = Math.floor(Math.random() * 3600) + 360; // 讓轉盤隨機旋轉 10-30 圈
            wheel.style.transform = `rotate(${randomRotation}deg)`;

            setTimeout(() => {
                alert('恭喜！您抽中了一張優惠卷！');
                spinButton.disabled = false;
            }, 3000); // 動畫持續3秒後顯示結果
        })
        .catch(error => {
            console.error('Error:', error);
            spinButton.disabled = false;
        });
}
