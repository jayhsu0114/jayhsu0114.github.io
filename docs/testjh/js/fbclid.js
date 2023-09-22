        // 获取当前页面的URL
        var currentURL = window.location.href;

        // 解析URL，获取参数部分
        var urlParams = new URL(currentURL);

        // 获取特定参数的值
        var paramValue = urlParams.searchParams.get('fbclid');

        // 将参数值输出到页面
        document.write("fbclid 参数的值是：" + paramValue);