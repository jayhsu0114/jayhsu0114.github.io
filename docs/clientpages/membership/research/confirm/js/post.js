document.addEventListener("DOMContentLoaded", function() {


  // 從當前 URL 中讀取參數
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get('userId') || 'unknown';
  const route = urlParams.get('route') || 'unknown';
  const strategy = urlParams.get('strategy') || 'unknown';
  const encryptedCode = urlParams.get('key') || 'unknown';

  // 從 local storage 中讀取 shopcode
  const shopcode = localStorage.getItem('shopcode');

  // 發送 POST 請求到伺服器
  fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-exchange/confirm', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          userId: userId,
          route: route,
          strategy: strategy,
          encryptedCode: encryptedCode,
          shopcode: shopcode
      })
  })
  .then(response => response.text())
  .then(data => {
      // 彈出後端回應
      alert(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
});
