async function fetchData() {
    try {
        const response = await fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/test-update-status');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // 清除現有的 sessionStorage
        sessionStorage.clear();

        // 創建 post-now 鍵，值為 1
        sessionStorage.setItem('post-now', '1');

        // 儲存每個 post 的資料
        let postIndex = 1; // 用來標記 post- 的序號
        const postKeys = [];

        // 遍歷每個鍵值對
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                // 儲存 post- 開頭的鍵
                if (key.startsWith('post-')) {
                    postKeys.push(key);
                    // 遍歷每組數據
                    data[key].forEach(item => {
                        const timestamp = item[0];
                        const content = item[1];
                        const postCode = item[5];

                        // 組成鍵名和值並存儲到 sessionStorage
                        sessionStorage.setItem(`${postCode}/timestamp`, timestamp);
                        sessionStorage.setItem(`${postCode}/content`, content);
                        sessionStorage.setItem(`${postCode}/postCode`, postCode);
                    });
                }
            }
        }

        // 將 post- 開頭的鍵值存儲到 sessionStorage
        postKeys.sort().forEach((key, index) => {
            const postCode = key.substring(5); // 去掉 "post-" 部分
            sessionStorage.setItem(`post-${index + 1}`, postCode);
        });

        // 執行新增的功能
        updatePostGroup();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// 查找以 post- 開頭的最大數字鍵
function getMaxPostKeyNumber() {
    let maxNumber = 1; // 預設最小值
    for (let key in sessionStorage) {
        if (key.startsWith('post-')) {
            let number = parseInt(key.substring(5), 10);
            if (!isNaN(number) && number > maxNumber) {
                maxNumber = number;
            }
        }
    }
    return maxNumber;
}

// 定義更新 sessionStorage 中 post-now 的函數
function updatePostNow(amount) {
    // 取得當前的 post-now 值，如果不存在則預設為 1
    let current = parseInt(sessionStorage.getItem('post-now'), 10);
    // 如果 current 不存在或低於 1，設為 1
    if (isNaN(current) || current < 1) {
        current = 1;
    }

    // 取得以 post- 開頭的最大數字鍵
    const maxPostNumber = getMaxPostKeyNumber();

    // 更新 post-now 值，確保不低於 1 且不超過最大數字
    current += amount;
    if (current < 1) {
        current = 1;
    }
    if (current > maxPostNumber) {
        current = maxPostNumber;
    }

    // 設定新的 post-now 值到 sessionStorage
    sessionStorage.setItem('post-now', current);

    // 執行新增的功能
    updatePostGroup();
}

// 新增功能：更新 post-group 的 input 值
function updatePostGroup() {
    // 取得 post-now 的值
    const postNow = sessionStorage.getItem('post-now');

    // 構造查詢鍵
    const postKey = `post-${postNow}`;

    // 查詢 sessionStorage 中是否有符合的鍵
    const postCode = sessionStorage.getItem(postKey);
    if (postCode) {

        // 處理 postCode，去掉 "ZSJH" 的開頭，將剩下的數字 +9，再加回 "ZSJH"
        let postCodeEnd;
        if (postCode.startsWith('ZSJH')) {
            const numericPart = parseInt(postCode.substring(4), 10);
            postCodeEnd = 'ZSJH' + (numericPart + 9);
        } else {
            postCodeEnd = postCode; // 如果沒有 "ZSJH" 開頭，保持不變
        }

        // 將 postCode 和 postCodeEnd 的值放入 id=post-group 的 input 中
        const postGroupInput = document.getElementById('post-group');
        if (postGroupInput) {
            postGroupInput.value = postCode + ' ~ ' + postCodeEnd;
        } else {
            console.warn('post-group input element not found');
        }
    } else {
        console.warn('Post key not found in sessionStorage');
    }
}

// 當頁面加載完成後調用 fetchData 函數
window.onload = fetchData;

// 當頁面載入完成後，設定按鈕的點擊事件處理器
window.addEventListener('DOMContentLoaded', (event) => {
    // 取得按鈕元素
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');

    // 設定按鈕的點擊事件處理器
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            updatePostNow(1);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            updatePostNow(-1);
        });
    }

    // Canvas 初始化代碼
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    const text = "示例文本內容，用於在canvas上顯示的文本，可以換行。";
    const id = "123456";
    const timestamp = "2024-08-04 12:34:56";

    const templateImage = new Image();
    templateImage.src = 'template.png';

    templateImage.onload = function() {
        ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

        // Log the size of template.png
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
});
