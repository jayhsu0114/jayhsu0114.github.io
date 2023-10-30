
    // 获取提交按钮元素
    var submitButton = document.getElementById("submitButton");

    // 添加点击事件监听器
    submitButton.addEventListener("click", function() {
        // 点击后禁用按钮
        submitButton.disabled = true;
        // 修改按钮文本，可以显示 "提交中..." 或其他提示
        submitButton.innerHTML = "提交中...";

        // 你可以在此添加其他提交相关的操作

        // 最终提交表单
        document.getElementById("demo-form").submit();
    });