window.onload = function () {
    const userId = localStorage.getItem("userId");

    if (!localStorage.getItem("agreement")) {
        showAgreementModal();
        return;
    }

    if (!userId) {
        console.error("錯誤：未在 localStorage 中找到 userId");
        return;
    }

    const winningUserIds = [
        "user_izzymxxxx",
        "user_admin",
    ];

    if (winningUserIds.includes(userId)) {
        showPrizeModal(userId);
    }
};

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
    termsBtn.style.marginRight = "10px";

    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = "同意";
    acceptBtn.style.backgroundColor = "#de6768";
    acceptBtn.style.color = "#ffffff";
    acceptBtn.style.border = "none";
    acceptBtn.style.padding = "10px 20px";
    acceptBtn.style.borderRadius = "5px";
    acceptBtn.style.cursor = "pointer";

    modalContent.appendChild(message);
    modalContent.appendChild(termsBtn);
    modalContent.appendChild(acceptBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    acceptBtn.onclick = function () {
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

function showPrizeModal(userId) {
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "2";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    modal.style.transition = "opacity 0.5s ease";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#ffffff";
    modalContent.style.margin = "10% auto";
    modalContent.style.padding = "30px 40px";
    modalContent.style.border = "2px solid #444";
    modalContent.style.width = "60%";
    modalContent.style.maxWidth = "600px";
    modalContent.style.borderRadius = "12px";
    modalContent.style.textAlign = "left";
    modalContent.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
    modalContent.style.lineHeight = "1.8";
    modalContent.style.fontSize = "16px";

    const title = document.createElement("h2");
    title.textContent = "⚠️ 重要通知";
    title.style.color = "#de6768";
    title.style.fontWeight = "bold";
    title.style.textAlign = "center";
    title.style.marginBottom = "20px";

    const introMessage = document.createElement("p");
    introMessage.textContent = "因您多次投稿有關校內發生性騷擾之貼文如下：";
    introMessage.style.fontWeight = "bold";
    introMessage.style.marginBottom = "15px";

    const sectionA = document.createElement("div");
    sectionA.innerHTML = `
        <p><strong>2024/12/16 下午9:50:25</strong> - 在江翠教社會科的噁男老師性騷擾國中女學生</p>
        <p><strong>2024/12/19 下午9:40:41</strong> - 教社會的噁男老師會性騷擾未成年國中生</p>
        <p><strong>2025/01/14 下午10:53:08</strong> - 社會科噁男老師不要再性騷擾未成年國中生la!!!!!</p>
    `;
    sectionA.style.marginBottom = "20px";
    sectionA.style.padding = "10px";
    sectionA.style.backgroundColor = "#f9f9f9";
    sectionA.style.borderRadius = "8px";

    const sectionB = document.createElement("p");
    sectionB.textContent = "故已為您報警處理，E化案號為 Z113129ADGP1GZ3，感謝您的支持與使用。";
    sectionB.style.fontWeight = "bold";
    sectionB.style.textAlign = "center";
    sectionB.style.marginTop = "15px";

    const closeButton = document.createElement("button");
    closeButton.textContent = "關閉";
    closeButton.style.backgroundColor = "#de6768";
    closeButton.style.color = "#ffffff";
    closeButton.style.padding = "12px 24px";

    modalContent.appendChild(title);
    modalContent.appendChild(introMessage);
    modalContent.appendChild(sectionA);
    modalContent.appendChild(sectionB);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}
