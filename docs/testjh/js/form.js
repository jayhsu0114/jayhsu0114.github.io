function GoogleForm() {　

    var field1 = $("[name='Q']").val();
    var field2 = $("[name='QQ']").val();
    var field3 = $("[name='QQQ']").val();
    //var field4 = $("[name='QQQQ']").val();
    var field4 = document.getElementById("QQQQ").innerText;
    var field5 = $("[name='QQQQQ']").val();
    var field6 = $("[name='QQQQQQ']").val();
    var field7 = $("[name='QQQQQQQ']").val();
    var field8 = $("[name='fbclid']").val();

    $.ajax({
     url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfA_75WHDZouggEiASDj016bPdlGYoAhjduwUk3T8azEFN84w/formResponse",

     data: {

      "entry.726741578":field1,
      "entry.1419849810":field2,
      "entry.1899191775":field3,
      "entry.595474089":field4,
      "entry.423345690":field5,
      "entry.916053787":field6,
      "entry.551332762":field7,
      "entry.156862022":field8,
     },
     type: "POST",
     dataType: "xml",
     statusCode: {

      0: function() {
       alert("您的匿名投稿已送出，過程維持完全匿名狀態。如果在我們發布前需要刪除請使用刪文系統。");　
       window.location.assign("https://jayhsu0114.github.io/zsjh");
      },

      200: function() {
       alert("您的匿名投稿已送出，過程維持完全匿名狀態。如果在我們發布前需要刪除請使用刪文系統。");　
       window.location.assign("https://jayhsu0114.github.io/zsjh");
      }
     }
    });
   }