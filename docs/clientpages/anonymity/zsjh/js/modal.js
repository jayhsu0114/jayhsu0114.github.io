window.onload = async function () {
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

    try {
        // 發送 POST 請求到 /out API
        const response = await fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form/out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
        });

        const result = await response.json();
        console.log("來自 /membership-form/out 的回應：", result);

        // 檢查返回的 data 是否符合條件
        const { coffee, pet, label } = result.data || {};
        const emptyFields = [coffee, pet, label].filter(field => field === "").length;

        if (emptyFields === 3) {
            showQuestionModal(
                "最近網站受到攻擊，請回答以下問題以確認您是真人",
                "你傾向購買哪種產品？",
                ["有品牌的", "有折扣的", "較實用的", "想要就買"],
                "label",
                userId
            );
        } else if (emptyFields === 2) {
            showQuestionModal(
                "最近網站受到攻擊，請回答以下問題以確認您是真人",
                "你喜歡哪種動物？",
                ["貓", "狗", "都喜歡", "都不喜歡"],
                "pet",
                userId
            );
        } else if (emptyFields === 1) {
            showQuestionModal(
                "最近網站受到攻擊，請回答以下問題以確認您是真人",
                "你比較常喝什麼？",
                ["星巴克", "路易莎"],
                "coffee",
                userId
            );
        }
        // 如果空字串為 0，則不顯示彈窗
    } catch (error) {
        console.error("發送到 /membership-form/out 的 POST 請求時發生錯誤：", error);
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

// 顯示問題彈窗
function showQuestionModal(hint, question, options, fieldKey, userId) {
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

    const hintMessage = document.createElement("p");
    hintMessage.textContent = hint;
    hintMessage.style.marginBottom = "10px";

    const questionMessage = document.createElement("p");
    questionMessage.textContent = question;
    questionMessage.style.marginBottom = "10px";

    modalContent.appendChild(hintMessage);
    modalContent.appendChild(questionMessage);

    const optionsContainer = document.createElement("div");
    optionsContainer.style.textAlign = "center";

    options.forEach(option => {
        const label = document.createElement("label");
        label.style.display = "block";
        label.style.marginBottom = "10px";
        label.style.textAlign = "center";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "humanCheck";
        input.value = option;
        input.style.marginRight = "10px";

        input.onclick = function () {
            // 發送 POST 請求到 /in API
            fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form/in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, [fieldKey]: input.value }),
            }).catch(error => {
                console.error("發送到 /membership-form/in 的 POST 請求時發生錯誤：", error);
            });

            // 不等待回應，直接隱藏 modal
            modal.style.opacity = "0";
            setTimeout(function () {
                modal.style.display = "none";
            }, 500);
        };

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    modalContent.appendChild(optionsContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}