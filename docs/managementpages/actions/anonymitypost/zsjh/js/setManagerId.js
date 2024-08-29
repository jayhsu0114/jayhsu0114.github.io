// setManagerId.js
document.addEventListener("DOMContentLoaded", function() {


    // 從 localStorage 獲取 username
    var username = localStorage.getItem("username");

    // 如果 username 存在，將其設置為 id 是 managerid 的 input 欄位的值
    if (username) {
        document.getElementById("managerid").value = username;
    }
});
