document.addEventListener('DOMContentLoaded', function() {
    // 清除 sessionStorage
    sessionStorage.clear();

    // 取得 Cookie 值
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

    // 用 Cookie 值填充 userId 輸入框
    document.getElementById('userId').value = getCookie('userId');

    // 生成隨機字串
    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // 表單提交處理
    document.getElementById('ctjhForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // 檢查提交次數
        const submitCount = parseInt(sessionStorage.getItem('submitCount')) || 0;
        if (submitCount >= 3) {
            alert('請稍候再試');
            return;
        }

        // 生成隨機代碼
        const randomCode = 'CTJH_' + generateRandomString(6);
        sessionStorage.setItem('regretCode', randomCode);

        // 禁用提交按鈕
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;

        // 準備要發送的數據
        const formData = {
            userId: getCookie('userId'),
            anonymousContent: document.getElementById('anonymousContent').value,
            formId: 'ctjh',
            randomCode: randomCode
        };

        // 發送數據到後端
        fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app//getctjhanonymity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text()) // 取得原始響應
        .then(text => {
            let canvasColor, canvasText;

            if (text === 'Data added successfully') {
                canvasColor = '#45b6d9';
                canvasText = '傳 送 中';

                // 創建新的按鈕元素
                const regretCodeButton = document.createElement('button');
                regretCodeButton.type = "button";
                regretCodeButton.id = "regretCodeButton";
                regretCodeButton.style.color = "black";

                // 創建顯示按鈕
                const showButton = document.createElement('button');
                showButton.textContent = "複製";
                showButton.style.height = "30px";
                showButton.style.backgroundColor = "#CCC";
                showButton.style.width = "40px";
                showButton.style.display = "none";
                showButton.style.border = "none";
                showButton.id = "showButton";
                showButton.style.position = "relative";
                showButton.style.zIndex = "2";
                showButton.style.borderRadius = "4px";
                showButton.style.marginLeft = '5px';
                showButton.style.color = 'black';

                // 創建一個隱藏的 input 元素
                const hiddenInput = document.createElement('input');
                hiddenInput.type = "text";
                hiddenInput.style.display = "none";
                hiddenInput.id = "hiddenInput";
                hiddenInput.value = randomCode; // 設置隱藏輸入的值
                hiddenInput.style.position = "relative";
                hiddenInput.style.zIndex = "2";
                hiddenInput.style.width = "110px";
                hiddenInput.style.height = "30px";
                hiddenInput.style.padding = "5px";
                hiddenInput.style.textAlign = "center";
                hiddenInput.style.border = "1px solid #333";
                hiddenInput.style.fontSize = "12px";
                hiddenInput.style.borderRadius = "4px";

                // 創建一個容器來放置按鈕和隱藏的 input
                const buttonContainer = document.createElement('div');
                buttonContainer.id = "regretdiv";
                buttonContainer.style.marginTop = '10px';
                buttonContainer.style.display = 'flex';
                buttonContainer.style.alignItems = 'center';
                buttonContainer.style.justifyContent = 'center';
                buttonContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                buttonContainer.style.zIndex = '1';
                buttonContainer.style.backgroundColor = '#fefdf7';
                buttonContainer.style.padding = '10px';
                buttonContainer.style.borderRadius = '4px';
                buttonContainer.style.width = `${container.offsetWidth}px`;

                buttonContainer.appendChild(regretCodeButton);
                buttonContainer.appendChild(hiddenInput);
                buttonContainer.appendChild(showButton);

                // 將按鈕容器添加到 .container 的下方
                container.parentNode.insertBefore(buttonContainer, container.nextSibling);

                // 延遲 3 秒後設置按鈕的文本
                setTimeout(() => {
                    regretCodeButton.textContent = '點我獲取後悔代碼';
                }, 900);

                // 添加按鈕點擊事件來顯示隱藏的 input 和顯示按鈕
                regretCodeButton.addEventListener('click', () => {
                    regretCodeButton.style.display = 'none';
                    hiddenInput.style.display = 'block';
                    showButton.style.display = 'block';
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
            } else if (text === 'Data deleted successfully') {
                canvasColor = '#fb6d00';
                canvasText = '刪 除 中';
            } else {
                throw new Error('資料提交失敗');
            }

            // 清空 textarea
            document.getElementById('anonymousContent').value = '';

            // 創建並插入 canvas 元素
            const textarea = document.getElementById('anonymousContent');
            const canvas = document.createElement('canvas');
            canvas.width = textarea.offsetWidth + 5;
            canvas.height = textarea.offsetHeight;
            canvas.style.position = 'absolute';
            canvas.style.top = textarea.offsetTop + 'px';
            canvas.style.left = textarea.offsetLeft + 'px';
            canvas.style.zIndex = '2';
            canvas.style.backgroundColor = canvasColor;

            const context = canvas.getContext('2d');
            context.fillStyle = '#fefdf7';
            context.font = 'bold 35px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(canvasText, canvas.width / 2, canvas.height / 2);

            textarea.parentNode.insertBefore(canvas, textarea);

            // 增加提交次數
            sessionStorage.setItem('submitCount', submitCount + 1);
        })
        .catch(error => {
            console.error('Error submitting form data:', error);
            alert('資料提交失敗');
        })
        .finally(() => {
            // 請求完成後重新啟用提交按鈕
            submitButton.disabled = false;
        });
    });
});
