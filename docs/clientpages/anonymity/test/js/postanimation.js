 document.getElementById('submitButton').addEventListener('click', function() {
            var textarea = document.getElementById('anonymousContent');
            var canvas = document.getElementById('contentCanvas');
            var text = textarea.value;

            // 每15個字符插入一個換行符
            text = text.replace(/(.{15})/g, '$1\n');

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
            context.fillStyle = '#FFFFFF'; // 背景色白色
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.font = '16px Arial'; // 設置字體
            context.textBaseline = 'top'; // 設置文本基線為頂部對齊
            context.fillStyle = '#000'; // 設置文本顏色

            // 將文本按行拆分並逐行顯示在canvas上
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
                context.fillText(lines[i], 10, i * 20);
            }

            // 开始动画
            startAnimation(canvas);
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