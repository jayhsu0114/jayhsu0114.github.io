let selectedAction = ''; // 用于记录用户的选择

function openModal(action) {
    selectedAction = action; // 根据按钮的点击设置选择
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function confirmSelection() {
    closeModal();
    switch (selectedAction) {
        case 'drawing':
            window.location.href = '/clientpages/membership/research/strategy/drawing';
            break;
        case 'discount':
            window.location.href = '/clientpages/membership/research/strategy/discount';
            break;
        case 'bundledeal':
            window.location.href = '/clientpages/membership/research/strategy/bundledeal';
            break;
        case 'gift':
            window.location.href = '/clientpages/membership/research/strategy/gift';
            break;
    }
}
