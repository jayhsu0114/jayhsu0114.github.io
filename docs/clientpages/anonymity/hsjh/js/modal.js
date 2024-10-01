window.onload = function() {
    // 創建彈窗的 HTML 結構
    var modal = document.createElement("div");
    modal.id = "myModal";
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.transition = "opacity 0.5s ease";  // 添加淡出效果

    var modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefdf7"; // 設定底色
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "70%"; // 設置直的長方形比例
    modalContent.style.maxWidth = "400px";
    modalContent.style.borderRadius = "10px"; // 設定圓角
    modalContent.style.textAlign = "center";
    modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // 增加陰影
    modalContent.style.transition = "transform 0.5s ease"; // 添加縮放過渡效果

    var message = document.createElement("p");
    message.textContent = "請同意使用協議以繼續瀏覽。";
    message.style.marginBottom5 = "5px";


    // 創建「使用協議」按鈕
    var termsBtn = document.createElement("button");
    termsBtn.textContent = "使用協議";
    termsBtn.style.backgroundColor = "#45b6d9"; // 設定底色為藍色
    termsBtn.style.color = "#ffffff"; // 字體顏色設為白色
    termsBtn.style.border = "none"; // 移除邊框
    termsBtn.style.padding = "10px 20px"; // 按鈕內邊距
    termsBtn.style.borderRadius = "5px"; // 按鈕圓角
    termsBtn.style.cursor = "pointer";
    termsBtn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // 增加按鈕陰影
    termsBtn.style.marginRight = "10px"; // 設置與「同意」按鈕的間距

    // 創建「同意」按鈕
    var acceptBtn = document.createElement("button");
    acceptBtn.textContent = "同意";
    acceptBtn.style.backgroundColor = "#5cc17b"; // 設定底色為紅色
    acceptBtn.style.color = "#ffffff"; // 字體顏色設為白色
    acceptBtn.style.border = "none"; // 移除邊框
    acceptBtn.style.padding = "10px 20px"; // 按鈕內邊距
    acceptBtn.style.borderRadius = "5px"; // 按鈕圓角
    acceptBtn.style.cursor = "pointer";
    acceptBtn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // 增加按鈕陰影

    // 將元素添加到彈窗中
    modalContent.appendChild(message);
    modalContent.appendChild(termsBtn);
    modalContent.appendChild(acceptBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 點擊同意按鈕後，逐漸縮小視窗
    acceptBtn.onclick = function() {
        modalContent.style.transform = "scale(0)"; // 視窗縮小至 0
        modal.style.opacity = "0"; // 背景淡出

        // 設置 0.5 秒後隱藏彈窗，與 transition 時間一致
        setTimeout(function() {
            modal.style.display = "none";
        }, 500);
    };

    // 點擊「使用協議」按鈕時跳轉到指定頁面
    termsBtn.onclick = function() {
        window.location.href = "/clientpages/regulations";
    };
};
