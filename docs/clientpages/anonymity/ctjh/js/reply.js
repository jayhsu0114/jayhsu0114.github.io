document.getElementById('reply').addEventListener('click', function() {
    // 隱藏原本按鈕
    this.style.display = 'none';

    // 在原本按鈕處插入 input 和 按鈕
    const replyInput = document.createElement('input');
    replyInput.id = 'reply_input';
    replyInput.type = 'text';
    replyInput.placeholder = '如：CTJH12345';
    
    const replyButton = document.createElement('button');
    replyButton.id = 'reply_button';
    replyButton.type = 'button';
    replyButton.innerText = '確定';

    // 創建一個 div 容器來包含 replyInput 和 replyButton
    const replyContainer = document.createElement('div');
    replyContainer.className = 'reply-container';
    replyContainer.appendChild(replyInput);
    replyContainer.appendChild(replyButton);

    this.parentNode.insertBefore(replyContainer, this);

    // 按下按鈕後清空 textarea，將 input 內文字填入 textarea
    replyButton.addEventListener('click', function() {
        const inputValue = replyInput.value.trim();
        const regex = /^CTJH\d+$/;

        // 檢查是否輸入了內容以及格式是否正確
        if (inputValue === '') {
            alert('請輸入要回覆的編號'); // 提示用戶輸入內容
            return; // 終止處理
        }

        if (!regex.test(inputValue)) {
            alert('請輸入正確編號（如：CTJH12345）'); // 提示用戶格式不正確
            return; // 終止處理
        }
        const textarea = document.querySelector('textarea');
        textarea.value = '回' + replyInput.value + '：\n';
        replyInput.value = ''; // 清空 input

        // 隱藏 input 和 按鈕，再顯示原本按鈕
        replyInput.style.display = 'none';
        replyButton.style.display = 'none';
        document.getElementById('reply').style.display = 'inline-block';
    });
});
