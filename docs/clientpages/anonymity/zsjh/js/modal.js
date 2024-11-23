window.onload = async function () {
    // 檢查 localStorage 中是否已經存在 agreement
    if (localStorage.getItem("agreement") === "agree") {
        // 如果已經同意，則進行 POST 請求
        try {
            const response = await fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form/out", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: "localUserId" }), // 替換為實際的 local userId
            });
            const result = await response.json();

            // 檢查返回的值中 "label" 是否為空白
            if (!result.label) {
                showHumanVerificationModal();
            }
        } catch (error) {
            console.error("Error during POST request:", error);
        }
        return;
    }

    // 顯示協議彈窗
    showAgreementModal();
};

// 顯示協議彈窗
function showAgreementModal() {
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
    modal.style.transition = "opacity 0.5s ease";

    var modalContent = document.createElement("div");
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

    var message = document.createElement("p");
    message.textContent = "請同意使用協議以繼續瀏覽";
    message.style.marginBottom = "5px";

    var termsBtn = document.createElement("button");
    termsBtn.textContent = "使用協議";
    termsBtn.style.backgroundColor = "#70a7dd";
    termsBtn.style.color = "#ffffff";
    termsBtn.style.border = "none";
    termsBtn.style.padding = "10px 20px";
    termsBtn.style.borderRadius = "5px";
    termsBtn.style.cursor = "pointer";
    termsBtn.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    termsBtn.style.marginRight = "10px";

    var acceptBtn = document.createElement("button");
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

    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.opacity = "0";
            setTimeout(function () {
                modal.style.display = "none";
            }, 500);
        }
    };
}

// 顯示人類驗證彈窗
function showHumanVerificationModal() {
    var modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.transition = "opacity 0.5s ease";

    var modalContent = document.createElement("div");
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

    var message = document.createElement("p");
    message.textContent = "最近網站受到攻擊，請回答以下問題以確認您是真人：你會傾向買哪種產品？";
    message.style.marginBottom = "10px";

    var options = ["有品牌的", "有折扣的", "有需要的", "有想要的"];
    options.forEach(option => {
        var label = document.createElement("label");
        label.style.display = "block";
        label.style.marginBottom = "5px";

        var input = document.createElement("input");
        input.type = "radio";
        input.name = "humanCheck";
        input.value = option;
        input.style.marginRight = "10px";

        input.onclick = async function () {
            try {
                await fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form/in", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ answer: input.value }),
                });
                modal.style.opacity = "0";
                setTimeout(function () {
                    modal.style.display = "none";
                }, 500);
            } catch (error) {
                console.error("Error during POST request:", error);
            }
        };

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        modalContent.appendChild(label);
    });

    modalContent.appendChild(message);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}