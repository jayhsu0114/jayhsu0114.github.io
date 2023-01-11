var url = window.location.href;


var fbclidValue = "";
if(url.indexOf("fbclid=") != -1) {
    var start = url.indexOf("fbclid=") + 7;
    var end = url.indexOf("&", start);
    if(end == -1) {
        end = url.length;
    }
    fbclidValue = url.substring(start, end);
}


console.log("fbclid: " + fbclidValue);


document.getElementById("QQQQQQQQ").value = fbclidValue;