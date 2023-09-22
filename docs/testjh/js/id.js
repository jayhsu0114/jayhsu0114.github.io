function getIdvalue()
{
    var navigator_info = window.navigator;
var screen_info = window.screen;
var uid = navigator_info.mimeTypes.length;
uid += navigator_info.userAgent.replace(/\D+/g, '&');
uid += "-"
uid += screen_info.height || '&';
uid += "-"
uid += screen_info.width || '&';
uid += "-"
uid += screen_info.pixelDepth || '.';
uid += "-"
uid += navigator_info.appName || '.';
uid += "-"
uid += navigator_info.appVersion || '.';
uid += "-"
uid += navigator_info.appCodeName || '.';
uid += "-"
uid += navigator_info.appMinorVersion || '.';
uid += "-"
uid += navigator_info.platform  || '.';
uid += "-"
uid += navigator_info.cookieEnabled  || '.';
uid += "-"
uid += navigator_info.plugins.length || '.';
document.getElementById("QQQQQ").value = uid;
}

window.onload = function() {
getIdvalue();
};