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
          surveyData[key] = [];
        }
        surveyData[key].push(value);
      });
  
      // Send data to the server
      fetch("https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      })
        .then((response) => {
          if (response.ok) {
            // Remove the form if submission is successful
            form.remove();
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
  