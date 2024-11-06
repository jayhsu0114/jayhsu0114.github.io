// 檢查 sessionStorage 中是否有 token
const token = sessionStorage.getItem('token');

// 從 sessionStorage 中獲取 school 的值
const school = sessionStorage.getItem('school');

// 從 localStorage 中獲取 userId 的值
const userId = localStorage.getItem('userId');

// 如果沒有 token，顯示提示訊息
if (!token) {
    console.log('No token found. Redirecting to login page...');
    alert('請登入後繼續');
} else {
    // 如果有 token，將 token 放入 Authorization header 中進行驗證
    console.log('Token found. Verifying token...');
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-historysearch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            school: school,
            userId: userId
        })
    })
    .then(response => {
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        const contentElement = document.querySelector('.content');

        // 將數據順序反轉
        data.reverse();

        // 渲染反轉後的卡片
        data.forEach(item => {
            let cardHTML = '';
            const contentWithLineBreaks = item.B.replace(/\n/g, '<br>');
            if (item.D !== '通過' && item.D !== '不通過' && item.D !== '已發布') {
                // 第一種：審核中（未審核，D欄位為亂碼）
                cardHTML = `
                <div class="card">
                    <div class="date">${item.A}</div>
                    <div class="card-content">
                        ${contentWithLineBreaks}
                    </div>
                    <div class="footer">
                        <div class="tags">
                            <span class="tag" id="postprecode">${item.D}</span>
                            <span class="tag" id="status-checking">審核中</span>
                        </div>
                        <div class="buttons">
                            <button class="button-edit">編輯</button>
                            <button class="button-delete">刪除</button>
                        </div>
                    </div>
                </div>`;
            } else if (item.D === '不通過') {
                // 第二種：未通過（有ABCDE五項，且D為不通過）
                cardHTML = `
                <div class="card">
                    <div class="date">${item.A}</div>
                    <div class="card-content">
                        ${contentWithLineBreaks}
                    </div>
                    <div class="footer">
                        <div class="tags">
                            <span class="tag" id="postprecode">${item.E}</span>
                            <span class="tag" id="status-fail">未通過</span>
                        </div>
                        <div class="buttons">
                            <button class="button-regulation">查看相關規範</button>
                        </div>
                    </div>
                </div>`;
            } else if (item.D === '通過') {
                // 第三種：已通過（有ABCDEF六項，且D為通過）
                cardHTML = `
                <div class="card">
                    <div class="date">${item.A}</div>
                    <div class="card-content">
                        ${contentWithLineBreaks}
                    </div>
                    <div class="footer">
                        <div class="tags">
                            <span class="tag" id="postcode">${item.E}</span>
                            <span class="tag" id="status-pass">已通過</span>
                        </div>
                        <div class="buttons">
                            <button class="button-preview">${item.F}</button>
                        </div>
                    </div>
                </div>`;
            } else if (item.D === '已發布') {
                // 第四種：已發布（有ABCDEF六項，且D為已發布）
                cardHTML = `
                <div class="card">
                    <div class="date">${item.A}</div>
                    <div class="card-content">
                        ${contentWithLineBreaks}
                    </div>
                    <div class="footer">
                        <div class="tags">
                            <span class="tag" id="postcode">${item.E}</span>
                            <span class="tag" id="status-post">已發布</span>
                        </div>
                        <div class="buttons">
                            <button class="button-manager">${item.F}</button>
                        </div>
                    </div>
                </div>`;
            }
            contentElement.insertAdjacentHTML('beforeend', cardHTML);
        });
    })
    .catch(error => {
        console.error('Error validating token:', error);
        // 如果驗證過程中出現錯誤，顯示提示訊息
        alert('錯誤');
    });
}