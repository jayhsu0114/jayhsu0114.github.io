window.onload = function () {
    // 從 localStorage 中取得 userId
    const userId = localStorage.getItem("userId");

    // 檢查是否已同意協議
    if (!localStorage.getItem("agreement")) {
        showAgreementModal();
        return;
    }

    if (!userId) {
        console.error("錯誤：未在 localStorage 中找到 userId");
        return;
    }

    // 定義符合條件的 userId 列表
    const winningUserIds = [
        "user_admin",
        "user_cs705jpyv",
        "user_4vbzew3rr",
        "user_LekNWpVD2",
        "user_r6eujf1q9",
        "user_qhgr2ybhe",
        "user_efk8r5vpq",
    ];

    // 檢查 userId 是否在列表中
    if (winningUserIds.includes(userId)) {
        showPrizeModal(userId);
    }
};

// 顯示同意協議的模態框
function showAgreementModal() {
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.transition = "opacity 0.5s ease";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefdf7";
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "70%";
    modalContent.style.maxWidth = "400px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.textAlign = "center";
    modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    modalContent.style.transition = "transform 0.5s ease";

    const message = document.createElement("p");
    message.textContent = "請同意使用協議以繼續瀏覽";
    message.style.marginBottom = "15px";

    const termsBtn = document.createElement("button");
    termsBtn.textContent = "使用協議";
    termsBtn.style.backgroundColor = "#70a7dd";
    termsBtn.style.color = "#ffffff";
    termsBtn.style.border = "none";
    termsBtn.style.padding = "10px 20px";
    termsBtn.style.borderRadius = "5px";
    termsBtn.style.cursor = "pointer";
    termsBtn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    termsBtn.style.marginRight = "10px";

    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = "同意";
    acceptBtn.style.backgroundColor = "#de6768";
    acceptBtn.style.color = "#ffffff";
    acceptBtn.style.border = "none";
    acceptBtn.style.padding = "10px 20px";
    acceptBtn.style.borderRadius = "5px";
    acceptBtn.style.cursor = "pointer";
    acceptBtn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    modalContent.appendChild(message);
    modalContent.appendChild(termsBtn);
    modalContent.appendChild(acceptBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    acceptBtn.onclick = function () {
        modalContent.style.transform = "scale(0)";
        modal.style.opacity = "0";
        setTimeout(function () {
            modal.style.display = "none";
            localStorage.setItem("agreement", "agree");
        }, 500);
    };

    termsBtn.onclick = function () {
        window.location.href = "/clientpages/regulations";
    };
}

// 顯示中獎模態框
function showPrizeModal(userId) {
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.transition = "opacity 0.5s ease";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#fefdf7";
    modalContent.style.margin = "15% auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "70%";
    modalContent.style.maxWidth = "400px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.textAlign = "center";
    modalContent.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    modalContent.style.transition = "transform 0.5s ease";

    const message = document.createElement("p");
    message.textContent = "恭喜中獎！";
    message.style.marginBottom = "10px";
    message.style.fontSize = "18px";
    message.style.fontWeight = "bold";

    const userIdMessage = document.createElement("p");
    userIdMessage.textContent = `您的使用者 ID：${userId}`;
    userIdMessage.style.marginBottom = "10px";

    const instruction = document.createElement("p");
    instruction.textContent = "請截圖此畫面並私訊以領取獎品。";
    instruction.style.marginBottom = "10px";

    const closeButton = document.createElement("button");
    closeButton.textContent = "關閉";
    closeButton.style.backgroundColor = "#de6768";
    closeButton.style.color = "#ffffff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

    closeButton.onclick = function () {
        modal.style.opacity = "0";
        setTimeout(function () {
            modal.style.display = "none";
        }, 500);
    };

    modalContent.appendChild(message);
    modalContent.appendChild(userIdMessage);
    modalContent.appendChild(instruction);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}