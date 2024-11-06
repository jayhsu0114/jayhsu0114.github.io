// survey-form.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("survey-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // 防止表單提交的默認行為
  
      // Disable the submit button
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
  
      // Get userId from localStorage
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        alert("無法取得使用者ID，請重新登入後再試。");
        submitButton.disabled = false;
        return;
      }
  
      // Collect form data
      const formData = new FormData(form);
      const surveyData = {
        userId: userId,
      };
  
      formData.forEach((value, key) => {
        if (!surveyData[key]) {
          surveyData[key] = value;
        } else {
          // 將相同鍵的多個值以逗號分隔的字符串形式存儲，確保複選框的多個選項結合成一格
          surveyData[key] = `${surveyData[key]}, ${value}`;
        }
      });
  
      // Send data to the server
      console.log("POST Body:", JSON.stringify(surveyData, null, 2));
      fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      })
        .then((response) => {
          if (response.ok) {
            // Hide the form if submission is successful but keep the space occupied to prevent footer from moving up
            form.style.display = "none";
            alert("問卷已提交，感謝您的參與！");
          } else {
            throw new Error("表單提交失敗，請稍後再試。");
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("提交失敗，請稍後再試。");
          submitButton.disabled = false;
        });
    });
  });
