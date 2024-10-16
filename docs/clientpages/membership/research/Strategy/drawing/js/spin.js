function spinWheel() {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    spinButton.disabled = true;
    const randomRotation = Math.floor(Math.random() * 3600) + 360; // 讓轉盤隨機旋轉 10-30 圈
    wheel.style.transform = `rotate(${randomRotation}deg)`;
}