function createRandomCircles() {
    const colors = ['#434343', '#fb6d00'];
    const container = document.querySelector('body');
    const circles = [];
    const circleSize = 40; // 圆球的直径
    const numCircles = Math.floor(window.innerWidth * window.innerHeight / (circleSize * circleSize * 2)); // 根据屏幕尺寸计算球的数量
    const speedFactor = 0.3; // 调整移动速度

    function isOverlapping(newCircle) {
        for (const circle of circles) {
            const dx = newCircle.left - circle.left;
            const dy = newCircle.top - circle.top;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circleSize) {
                return true;
            }
        }
        return false;
    }

    for (let i = 0; i < numCircles; i++) {
        let newCircle;
        let attempts = 0;

        do {
            newCircle = {
                left: Math.random() * (window.innerWidth - circleSize),
                top: Math.random() * (window.innerHeight - circleSize)
            };
            attempts++;
        } while (isOverlapping(newCircle) && attempts < 100); // 限制尝试次数，避免死循环

        if (attempts < 100) {
            const circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            circle.style.left = `${newCircle.left}px`;
            circle.style.top = `${newCircle.top}px`;
            container.appendChild(circle);
            circles.push({
                element: circle,
                ...newCircle,
                dy: -(Math.random() * speedFactor + 0.5) // 上升速度
            });
        }
    }

    function moveCircles() {
        for (const circle of circles) {
            circle.top += circle.dy;

            if (circle.top <= -circleSize) {
                circle.top = window.innerHeight; // 重置到底部
            }

            circle.element.style.left = `${circle.left}px`;
            circle.element.style.top = `${circle.top}px`;
        }

        requestAnimationFrame(moveCircles);
    }

    moveCircles();
}

document.addEventListener('DOMContentLoaded', createRandomCircles);