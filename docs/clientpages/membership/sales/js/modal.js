function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function confirmSelection() {
    alert("選擇已確認");
    closeModal();
}
