export function initializeCanvas() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const text = "示例文本內容，用於在canvas上顯示的文本，可以換行。";
    const id = "123456";
    const timestamp = "2024-08-04 12:34:56";

    const templateImage = new Image();
    templateImage.src = 'template.png';

    templateImage.onload = function() {
        ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);
        console.log('Template image size:', templateImage.width, 'x', templateImage.height);

        const inputFlow = '系統負載率：100%';

        ctx.font = '30px Noto Serif TC';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        const textX = canvas.width / 2;
        const lineHeight = 60;
        const maxCharactersPerLine = 20;

        const lines = wrapText(text, maxCharactersPerLine);
        const textHeight = lines.length * lineHeight;
        const startY = (canvas.height - textHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, textX, 30 + startY + (index * lineHeight));
        });

        ctx.fillStyle = '#EBAFAF';
        ctx.fillText(inputFlow, canvas.width / 2, 870);
        ctx.fillStyle = '#F4A261';
        ctx.fillText(id, canvas.width / 2, 912.5);
        ctx.fillStyle = '#F4A261';
        ctx.fillText(timestamp, canvas.width / 2, 955);

        console.log('Image generated successfully');
    };

    function wrapText(text, maxCharactersPerLine) {
        const lines = [];
        let line = '';

        for (let i = 0; i < text.length; i++) {
            line += text[i];
            if (text[i] === '\n' || (i + 1) % maxCharactersPerLine === 0 || i === text.length - 1) {
                lines.push(line.trim());
                line = '';
            }
        }

        return lines;
    }
}
