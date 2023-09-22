var currentURL = window.location.href;

var urlParams = new URL(currentURL);

var paramValue = urlParams.searchParams.get('fbclid');

var fbclidInput = document.getElementById('fbclid');
fbclidInput.value = paramValue;