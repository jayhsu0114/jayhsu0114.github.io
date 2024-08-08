// 下載按鈕事件處理器
document.getElementById('download').addEventListener('click', function() {
    var zip = new JSZip();
    
    for (let i = 1; i <= 10; i++) {
        let canvas = document.getElementById(`canvas${i}`);
        if (canvas) {
            // Convert canvas to data URL
            let dataURL = canvas.toDataURL('image/png');

            // Remove the prefix from the data URL
            let data = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');

            // Add file to zip
            zip.file(`Post${i}.png`, data, {base64: true});
        }
    }

    // Generate the zip file and trigger the download
    zip.generateAsync({type: 'blob'}).then(function(content) {
        // Retrieve postGroupValue from sessionStorage or set a default value
        const postNow = sessionStorage.getItem('post-now');
        const postKey = `post-${postNow}`;
        const postCode = sessionStorage.getItem(postKey);
        const postGroupValue = postCode || 'default-group-value'; // Provide a default value if postCode is not available

        saveAs(content, `${postGroupValue}.zip`);

        // 發送 POST 請求
        if (postCode) {
            fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/hsjh-postmaker', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postCode: postCode,
                    status: '已發布'
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                console.log('POST request successful:', data);
            })
            .catch(error => {
                console.error('POST request error:', error);
            });
        } else {
            console.warn('Post code not found in sessionStorage');
        }
    });
});

// 獲取數據並更新 sessionStorage
async function fetchData() {
    try {
        const response = await fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/hsjh-update-status');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // 清除現有的 sessionStorage
        sessionStorage.clear();

        // 創建 post-now 鍵，值為 1
        sessionStorage.setItem('post-now', '1');

        // 儲存每個 post 的資料
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
        // 设置输入框为“无待发布匿名”
        const postGroupInput = document.getElementById('post-group');
        if (postGroupInput) {
            postGroupInput.value = '無待發布匿名';
        }
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

// 鎖定按鈕
function setDownloadButtonState(enabled) {
    const downloadButton = document.getElementById('download');
    if (downloadButton) {
        downloadButton.disabled = !enabled;
    }
}

// 新增功能：更新 post-group 的 input 值並重繪 canvas
function updatePostGroup() {
    // 鎖定下載按鈕
    setDownloadButtonState(false);

    // 取得 post-now 的值
    const postNow = sessionStorage.getItem('post-now');

    // 構造查詢鍵
    const postKey = `post-${postNow}`;

    // 查詢 sessionStorage 中是否有符合的鍵
    const postCode = sessionStorage.getItem(postKey);
    if (postCode) {
        // 處理 postCode，去掉 "HSJH" 的開頭，將剩下的數字 +9，再加回 "HSJH"
        let postCodeEnd;
        if (postCode.startsWith('HSJH')) {
            const numericPart = parseInt(postCode.substring(4), 10);
            postCodeEnd = 'HSJH' + (numericPart + 9);
        } else {
            postCodeEnd = postCode; // 如果沒有 "HSJH" 開頭，保持不變
        }

        // 將 postCode 和 postCodeEnd 的值放入 id=post-group 的 input 中
        const postGroupInput = document.getElementById('post-group');
        if (postGroupInput) {
            postGroupInput.value = postCode + ' ~ ' + postCodeEnd;
        } else {
            console.warn('post-group input element not found');
        }

        // 重繪所有 canvas
        let canvasesDrawn = 0; // 計數器，用於追踪已繪製的 canvas 數量
        for (let i = 1; i <= 10; i++) {
            const currentPostCode = 'HSJH' + (parseInt(postCode.substring(4), 10) + (i - 1));
            drawCanvas(currentPostCode, `canvas${i}`, () => {
                canvasesDrawn++;
                if (canvasesDrawn === 10) {
                    //alert('All canvases have been drawn!');
                    // 解鎖下載按鈕
                    setDownloadButtonState(true);
                }
            });
        }

        // 查詢 postCode 的狀態並更新 id="post-status" 的 input
        const postStatus = sessionStorage.getItem(`${postCode}/status`);
        const postStatusInput = document.getElementById('post-status');
        if (postStatusInput) {
            if (postStatus) {
                postStatusInput.value = postStatus;
            } else {
                postStatusInput.value = '';
            }
        }
    } else {
        console.warn('Post key not found in sessionStorage');
        // 设置输入框为“无待发布匿名”
        const postGroupInput = document.getElementById('post-group');
        if (postGroupInput) {
            postGroupInput.value = '無待發布匿名';
        }
    }
}

// 重繪 canvas 的函數
function drawCanvas(postCode, canvasId, callback) { // 新增 callback 參數
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    // 從 sessionStorage 中獲取對應的內容
    const text = sessionStorage.getItem(`${postCode}/content`) || "匿名內容";
    const id = sessionStorage.getItem(`${postCode}/postCode`) || "ZSJH00000";
    const timestamp = sessionStorage.getItem(`${postCode}/timestamp`) || "2000-01-01 12:00:00";

    const templateImage = new Image();
    templateImage.src = 'template.png';

    templateImage.onload = function() {
        ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

        const inputFlow = '系統負載率：100%';

        ctx.font = 'bold 30px Noto Serif TC';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        const textX = canvas.width / 2;
        const lineHeight = 40;
        const maxCharactersPerLine = 20;

        const lines = wrapText(text, maxCharactersPerLine);
        const textHeight = lines.length * lineHeight;
        const startY = (canvas.height - textHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, textX, 40 + startY + (index * lineHeight));
        });

        ctx.fillStyle = '#EBAFAF';
        ctx.fillText(inputFlow, canvas.width / 2, 870);
        ctx.fillStyle = '#F4A261';
        ctx.fillText(id, canvas.width / 2, 912.5);
        ctx.fillStyle = '#F4A261';
        ctx.fillText(timestamp, canvas.width / 2, 955);

        console.log(`Image generated successfully for ${canvasId}`);

        // 调用回调函数
        if (callback) callback();
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

// 當頁面加載完成後調用 fetchData 函數
window.onload = fetchData;

// 當頁面載入完成後，設定按鈕的點擊事件處理器
window.addEventListener('DOMContentLoaded', (event) => {
    // 取得按鈕元素
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    const downloadButton = document.getElementById('download');

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

    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const postNow = sessionStorage.getItem('post-now');
            const postKey = `post-${postNow}`;
            const postCode = sessionStorage.getItem(postKey);
            
            if (postCode) {
                // 將「已下載」放入 id="post-status" 的 input 中
                const postStatusInput = document.getElementById('post-status');
                if (postStatusInput) {
                    postStatusInput.value = '已下載';
                }

                // 在 session storage 中以 ${postCode}/status 為鍵，已發布為值
                sessionStorage.setItem(`${postCode}/status`, '已發布');
                
                // 發送 POST 請求
                fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/hsjh-postmaker', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        postCode: postCode,
                        status: '已發布'
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('POST request successful:', data);
                })
                .catch(error => {
                    console.error('POST request error:', error);
                });
            } else {
                console.warn('Post code not found in sessionStorage');
            }
        });
    }

    // 初始重繪所有 canvas
    const postNow = sessionStorage.getItem('post-now');
    const postKey = `post-${postNow}`;
    const postCode = sessionStorage.getItem(postKey);
    for (let i = 1; i <= 10; i++) {
        const currentPostCode = 'HSJH' + (parseInt(postCode.substring(4), 10) + (i - 1));
        drawCanvas(currentPostCode, `canvas${i}`);
    }
});
