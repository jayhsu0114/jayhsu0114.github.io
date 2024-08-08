document.addEventListener('DOMContentLoaded', function () {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('instagram') === -1) {
        window.location.href = '/clientpages/wrongpage';
    }
});