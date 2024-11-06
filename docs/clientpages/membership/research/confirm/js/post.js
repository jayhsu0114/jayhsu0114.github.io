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
      // 檢查後端回應並進行相應的 alert
      const [type, amount] = data.split(":");
      switch (type) {
          case 'bundledeal':
              alert('學生使用之優惠為組合餐');
              break;
          case 'gift':
              alert('學生使用之優惠為贈品');
              break;
          case 'discount':
              alert('學生使用之優惠為折扣30元');
              break;
          case 'drawing':
              alert(`學生使用之優惠為折扣 ${amount} 元`);
              break;
          default:
              alert(data);
              break;
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
});