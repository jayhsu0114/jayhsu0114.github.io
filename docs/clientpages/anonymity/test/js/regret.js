const checkInterval = 1000; // 檢查間隔時間（以毫秒為單位）

// 記錄上次檢查的 regretCode 以及時間戳
let lastRegretCode = sessionStorage.getItem('regretCode');
let lastUpdateTimestamp = Date.now();

function checkRegretCode() {
    const regretCode = sessionStorage.getItem('regretCode');
    const currentTimestamp = Date.now();

    // 確保 .container 元素存在
    const container = document.querySelector('.container');
    if (container) {
        // 檢查 regretCode 是否存在且不為空
        if (regretCode && regretCode.trim() !== '' && (regretCode !== lastRegretCode || !document.getElementById('regretCodeButton'))) {
            // 獲取當前的 submitCount
            let submitCount = parseInt(sessionStorage.getItem('submitCount') || '0', 10);

            // 如果 submitCount 大於等於 3，則不執行後續邏輯
            if (submitCount >= 3) {
                return;
            }

            // 更新上次的 regretCode 和時間戳
            lastRegretCode = regretCode;
            lastUpdateTimestamp = currentTimestamp;

            // 創建新的按鈕元素
            const regretCodeButton = document.createElement('button');
            regretCodeButton.type = "button";
            regretCodeButton.id = "regretCodeButton";

            // 創建顯示按鈕
            const showButton = document.createElement('button');
            showButton.textContent = "複製";
            showButton.style.height = "30px";
            showButton.style.backgroundColor = "#CCC";
            showButton.style.width = "40px"; // 設置寬度為 40px
            showButton.style.display = "none";
            showButton.style.border = "none"; // 初始時隱藏
            showButton.id = "showButton";
            showButton.style.position = "relative"; // 設置定位
            showButton.style.zIndex = "2";
            showButton.style.borderRadius = "4px";
            showButton.style.marginLeft = '5px'; // 按鈕和 input 之間的間隔

            // 創建一個隱藏的 input 元素
            const hiddenInput = document.createElement('input');
            hiddenInput.type = "text";
            hiddenInput.style.display = "none"; // 初始時隱藏
            hiddenInput.id = "hiddenInput";
            hiddenInput.value = regretCode; // 設置隱藏輸入的值
            hiddenInput.style.position = "relative"; // 設置定位
            hiddenInput.style.zIndex = "2";
            hiddenInput.style.width = "110px";
            hiddenInput.style.height = "30px";
            hiddenInput.style.padding = "5px";
            hiddenInput.style.textAlign = "center";
            hiddenInput.style.border = "1px solid #333";
            hiddenInput.style.fontSize = "12px";
            hiddenInput.style.borderRadius = "4px";

            // 創建一個容器來放置按鈕和隱藏的 input，並設置 margin-top 以在 .container 下方顯示
            const buttonContainer = document.createElement('div');
            buttonContainer.id = "regretdiv";
            buttonContainer.style.marginTop = '10px'; // 設置與 .container 的距離
            buttonContainer.style.display = 'flex'; // 使用 Flexbox
            buttonContainer.style.alignItems = 'center'; // 垂直置中
            buttonContainer.style.justifyContent = 'center'; // 水平置中
            buttonContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            buttonContainer.style.zIndex = '1';
            buttonContainer.style.backgroundColor = '#fefdf7'; // 設置背景顏色為黑色
            buttonContainer.style.padding = '10px'; // 增加內邊距以提升可讀性
            buttonContainer.style.borderRadius = '4px'; // 增加邊角圓度
            buttonContainer.style.width = `${container.offsetWidth}px`; // 設置寬度與 .container 相同

            buttonContainer.appendChild(regretCodeButton);
            buttonContainer.appendChild(hiddenInput); // 將隱藏的 input 添加到容器中
            buttonContainer.appendChild(showButton); // 將顯示按鈕添加到容器中

            // 將按鈕容器添加到 .container 的下方
            container.parentNode.insertBefore(buttonContainer, container.nextSibling);

            // 延遲 3 秒後設置按鈕的文本
            setTimeout(() => {
                regretCodeButton.textContent = '點我獲取後悔代碼';
            }, 900);

            // 添加按鈕點擊事件來顯示隱藏的 input 和顯示按鈕
            regretCodeButton.addEventListener('click', () => {
                regretCodeButton.style.display = 'none'; // 隱藏按鈕
                hiddenInput.style.display = 'block'; // 顯示隱藏的 input
                showButton.style.display = 'block'; // 顯示顯示按鈕
            });

            // 添加顯示按鈕點擊事件來複製後悔代碼
            showButton.addEventListener('click', () => {
                navigator.clipboard.writeText(hiddenInput.value)
                    .then(() => {
                        alert('後悔代碼已複製到剪貼簿');
                    })
                    .catch(err => {
                        console.error('複製到剪貼簿失敗', err);
                    });
            });
        }
    }
}

// 開始定期檢查 sessionStorage 中的 regretCode
setInterval(checkRegretCode, checkInterval);
