function drawCoupon() {
    const stick = document.getElementById('draw-stick');
    const button = document.getElementById('draw-button');
    button.disabled = true;
    stick.style.transform = 'translateY(-120%)';

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
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-strategy/bundledeal', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        .then(data => {
            // Store discount message in sessionStorage
            sessionStorage.setItem('strategy', data.message);

            // Play animation
            setTimeout(() => {
                alert('恭喜！您抽中了一張優惠卷！');
                stick.style.transform = 'translateY(50%)';
                button.disabled = false;
            }, 2000); // 動畫持續2秒後顯示結果並復位
        })
        .catch(error => {
            console.error('Error:', error);
            button.disabled = false;
        });
}
