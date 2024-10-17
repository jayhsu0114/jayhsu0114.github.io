function drawCoupon() {
    const stick = document.getElementById('draw-stick');
    const button = document.getElementById('draw-button');
    button.disabled = true;
    stick.style.transform = 'translateY(-120%)';
    setTimeout(() => {
        alert('恭喜！您抽中了一張優惠卷！');
        stick.style.transform = 'translateY(50%)';
    }, 2000); // 動畫持續2秒後顯示結果並復位
}