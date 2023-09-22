// 获取当前页面的URL
var currentURL = window.location.href;

// 解析URL，获取参数部分
var urlParams = new URL(currentURL);

// 获取特定参数的值
var paramValue = urlParams.searchParams.get('fbclid');

// 将参数值设置到输入元素中
var fbclidInput = document.getElementById('fbclid');
fbclidInput.value = paramValue;