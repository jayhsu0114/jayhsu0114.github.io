document.addEventListener('DOMContentLoaded', function() {
    // Function to get cookie value by name
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return '';
    }

    // Fill userId input with cookie value
    document.getElementById('userId').value = getCookie('userId');

    // Form submission handling
    document.getElementById('zsjhForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Disable submit button
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;

        // Prepare data to send
        const formData = {
            userId: getCookie('userId'),
            anonymousContent: document.getElementById('anonymousContent').value,
            formId: 'zsjh'
        };

        // Post data to backend URL
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/Mercury', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Clear textarea after successful submission
                document.getElementById('anonymousContent').value = '';

                // Submit button click handling for canvas animation
                var textarea = document.getElementById('anonymousContent');
                var canvas = document.getElementById('contentCanvas');
                
                var text = '發送中'

                // 獲取textarea的寬高
                var width = textarea.offsetWidth;
                var height = textarea.offsetHeight;

                // 設置canvas的寬高與textarea一致
                canvas.width = width;
                canvas.height = height;

                // 顯示canvas，隱藏textarea
                canvas.style.display = 'block';
                textarea.style.display = 'none';
                

                var context = canvas.getContext('2d');

                // 设置canvas背景色为白色
                context.fillStyle = '#70a7dd'; // 背景色白色
                context.fillRect(0, 0, canvas.width, canvas.height);

                context.font = '40px Arial'; // 設置字體
                context.textBaseline = 'middle'; // 設置文本基線為頂部對齊
                context.fillStyle = '#fefdf7'; // 設置文本顏色

                // 測量文本的寬度
                var textWidth = context.measureText(text).width;

                // 計算文本的位置使其水平垂直置中
                var x = (canvas.width - textWidth) / 2;
                var y = canvas.height / 2;

                // 在Canvas中繪製文本
                context.fillText(text, x, y);

                // 开始动画
                startAnimation(canvas);
            } else {
                throw new Error('資料提交失敗');
            }
        })
        .catch(error => {
            console.error('Error submitting form data:', error);
            alert('資料提交失敗');
        })
        .finally(() => {
            // Re-enable submit button after request completes
            // This will be called after animation completes as well
            submitButton.disabled = false;

            // Reload the page after all events complete
            reloadPage();
        });
    });

    function startAnimation(canvas) {
        var startTime = null;
        var initialWidth = canvas.width;
        var initialHeight = canvas.height;
        var finalDiameter = 35;
        var animationDuration = 2000; // 动画持续时间（毫秒）

        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;

            var easing = Math.min(progress / animationDuration, 1); // 线性插值

            // 渐变背景和边框颜色
            canvas.style.backgroundColor = `rgba(112, 167, 221, ${easing})`;
            canvas.style.borderColor = `rgba(112, 167, 221, ${easing})`;

            // 计算当前宽高
            var currentWidth = initialWidth - (initialWidth - finalDiameter) * easing;
            var currentHeight = initialHeight - (initialHeight - finalDiameter) * easing;

            // 计算当前圆角半径
            var borderRadius = (currentWidth / 2) * easing;
            var fillarea = document.getElementById('fillarea');
                fillarea.style.display = 'block';
            canvas.style.borderRadius = `${borderRadius}px`;

            // 计算当前Y轴位置
            var currentY = canvas.offsetTop - 100 * easing;
            canvas.style.transform = `translateY(${currentY}px)`;

            // 设置当前宽高
            canvas.style.width = `${currentWidth}px`;
            canvas.style.height = `${currentHeight}px`;

            if (easing < 1) {
                requestAnimationFrame(animate);
            } else {
                // 持续向上移动直到完全超出螢幕邊界
                continueMoveUp(canvas);
            }
        }

        requestAnimationFrame(animate);
    }

    function continueMoveUp(canvas) {
        var startTime = null;
        var initialTop = canvas.offsetTop;
        var moveUpDuration = 2000; // 移动持续时间（毫秒）

        function move(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;

            var easing = Math.min(progress / moveUpDuration, 1); // 线性插值

            // 计算当前Y轴位置
            var currentY = initialTop - window.innerHeight * easing;
            canvas.style.transform = `translateY(${currentY}px)`;

            if (easing < 1) {
                requestAnimationFrame(move);
            }
        }

        requestAnimationFrame(move);
    }

    function reloadPage() {
        // Reload the page after all events complete
        setTimeout(function() {
            window.location.reload();
        }, 6000); // 4秒後重新載入頁面，可以根據需求調整時間
    }
});
