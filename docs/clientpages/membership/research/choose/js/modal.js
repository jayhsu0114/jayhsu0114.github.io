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
