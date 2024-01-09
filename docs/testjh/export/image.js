function drawTextOnCanvas() {
    const userInput = document.getElementById('textInput').value;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // 載入背景圖片
    const background = new Image();
    background.src = './zsjh.png';

    // 當背景圖片載入完成後執行
    background.onload = function() {
        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 繪製背景圖片
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // 在畫布上繪製文字（允許換行）
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';

        // 設定最大寬度，這裡假設為畫布的寬度
        const maxWidth = canvas.width - 400;  // 400 是預留給左右的邊距
        const lineHeight = 25;  // 行高，可以根據需要調整

        // 將文字分割成多行
        const words = userInput.split(' '); 
        let lines = [];
        let currentLine = '';

        for (const word of words) {
            const testLine = currentLine + word + ' ';
            const testWidth = ctx.measureText(testLine).width;

            if (testWidth <= maxWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            }
        }

        // 將最後一行文字添加到 lines
        lines.push(currentLine.trim());

        // 計算文字整體高度
        const totalTextHeight = lines.length * lineHeight;
        let yPosition = (canvas.height - totalTextHeight) / 2;

        // 繪製每一行文字
        for (const line of lines) {
            ctx.fillText(line, (canvas.width - ctx.measureText(line).width) / 2, yPosition);
            yPosition += lineHeight;
        }

        // 轉換為圖片
        const image = new Image();
        image.src = canvas.toDataURL();

        // 插入到 body 中
        document.body.appendChild(image);
    };
}