let selectedAction = ''; // 用于记录用户的选择

function openModal(action) {
    selectedAction = action; // 根据按钮的点击设置选择
    document.getElementById("modal").style.display = "flex";

    // 根据选择的动作来设置图像路径
    let imagePath = `./${selectedAction}.webp`;
    document.getElementById("fake-image").src = imagePath;

    // 根据选择的动作动态添加提示文本
    let modalTextElement = document.querySelector(".modal-text");
    let newTextElement = document.getElementById("action-description");

    // 如果之前添加了描述，先将其移除
    if (newTextElement) {
        newTextElement.remove();
    }

    // 创建一个新的描述元素
    newTextElement = document.createElement("p");
    newTextElement.id = "action-description";

    // 根据不同的选择设置描述文本
    switch (selectedAction) {
        case 'drawing':
            newTextElement.textContent = "有機率獲取10元、30元、50元、100元折扣券";
            break;
        case 'bundledeal':
            newTextElement.textContent = "點餐時可憑券購買匿名版聯名套餐，該餐點免收服務費";
            break;
        case 'gift':
            newTextElement.textContent = "點餐時該餐點可獲取神秘小禮物一份";
            break;
        case 'discount':
            newTextElement.textContent = "可獲取30元折扣券";
            break;
    }

    // 在 modal-text 之前插入新的描述元素
    modalTextElement.parentNode.insertBefore(newTextElement, modalTextElement);
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function confirmSelection() {
    closeModal();
    switch (selectedAction) {
        case 'drawing':
            window.location.href = '/clientpages/membership/research/Strategy/drawing';
            break;
        case 'discount':
            window.location.href = '/clientpages/membership/research/Strategy/discount';
            break;
        case 'bundledeal':
            window.location.href = '/clientpages/membership/research/Strategy/bundledeal';
            break;
        case 'gift':
            window.location.href = '/clientpages/membership/research/Strategy/gift';
            break;
    }
}

function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if (sideMenu.style.width === "250px") {
        sideMenu.style.width = "0";
        menuOverlay.style.display = "none";
    } else {
        sideMenu.style.width = "250px";
        menuOverlay.style.display = "block";
    }
}

function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
    document.getElementById("menu-overlay").style.display = "none";
}
