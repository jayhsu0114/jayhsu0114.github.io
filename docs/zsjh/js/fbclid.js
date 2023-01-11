 // 取得網址
 var url = window.location.href;

 // 取得網址中的 fbclid
 var fbclidValue = "";
 if(url.indexOf("fbclid=") != -1) {
     var start = url.indexOf("fbclid=") + 7;
     var end = url.indexOf("&", start);
     if(end == -1) {
         end = url.length;
     }
     fbclidValue = url.substring(start, end);
 }

 // 輸出取得的 fbclid
 console.log("fbclid: " + fbclidValue);

 // 將 fbclidValue 賦值給表單輸入欄位
 document.getElementById("fbclid").value = fbclidValue;