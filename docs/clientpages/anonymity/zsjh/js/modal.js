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
        "user_izzymxxxx",
        "user_admin",
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
    modalContent.style.margin = "10% auto";
    modalContent.style.padding = "30px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "70%";
    modalContent.style.maxWidth = "500px";
    modalContent.style.borderRadius = "12px";
    modalContent.style.textAlign = "left";
    modalContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    modalContent.style.lineHeight = "1.6";
    modalContent.style.fontSize = "16px";
    modalContent.style.transition = "transform 0.5s ease";

    const title = document.createElement("h2");
    title.textContent = "重要通知";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";
    title.style.fontWeight = "bold";

    const sectionA = document.createElement("p");
    sectionA.textContent = "因您多次投稿有關校內發生性騷擾之貼文如下：";
    sectionA.style.marginBottom = "15px";

    const timestamp1 = document.createElement("p");
    timestamp1.innerHTML = "<strong>2024/12/16 下午9:50:25</strong>";

    const text1 = document.createElement("p");
    text1.textContent = "在江翠教社會科的噁男老師性騷擾國中女學生";

    const timestamp2 = document.createElement("p");
    timestamp2.innerHTML = "<strong>2024/12/19 下午9:40:41</strong>";

    const text2 = document.createElement("p");
    text2.textContent = "教社會的噁男老師會性騷擾未成年國中生";

    const timestamp3 = document.createElement("p");
    timestamp3.innerHTML = "<strong>2025/01/14 下午10:53:08</strong>";

    const text3 = document.createElement("p");
    text3.textContent = "社會科噁男老師不要再性騷擾未成年國中生la!!!!!";

    const sectionB = document.createElement("p");
    sectionB.textContent = "故已為您報警處理，E化案號為Z113129ADGP1GZ3，感謝您的支持與使用。";
    sectionB.style.marginTop = "15px";
    sectionB.style.fontWeight = "bold";

    const closeButton = document.createElement("button");
    closeButton.textContent = "關閉";
    closeButton.style.backgroundColor = "#de6768";
    closeButton.style.color = "#ffffff";
    closeButton.style.border = "none";
    closeButton.style.padding = "10px 20px";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    closeButton.style.display = "block";
    closeButton.style.margin = "20px auto 0";

    closeButton.onclick = function () {
        modal.style.opacity = "0";
        setTimeout(function () {
            modal.style.display = "none";
        }, 500);
    };

    modalContent.appendChild(title);
    modalContent.appendChild(sectionA);
    modalContent.appendChild(timestamp1);
    modalContent.appendChild(text1);
    modalContent.appendChild(timestamp2);
    modalContent.appendChild(text2);
    modalContent.appendChild(timestamp3);
    modalContent.appendChild(text3);
    modalContent.appendChild(sectionB);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
} 