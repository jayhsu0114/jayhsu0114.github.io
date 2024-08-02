document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('edit-end').querySelector('button').addEventListener('click', function() {
      const storageKeys = Object.keys(sessionStorage);
      const jsonData = {};
  
      // 過濾掉不需要的鍵
      storageKeys.forEach(key => {
        if (key.includes('/')) {
          const [prefix, subKey] = key.split('/');
          if (!jsonData[prefix]) {
            jsonData[prefix] = {};
          }
          jsonData[prefix][subKey] = sessionStorage.getItem(key);
        }
      });
  
      // 將 JSON 數據轉換為字符串
      const jsonString = JSON.stringify(jsonData);
      
      // 在控制台打印 JSON 物件（可選）
      console.log('JSON Data:', jsonData); 
  
      // 發送 POST 請求
      fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/test-anonymity-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonString
      })
      .then(response => {
        // 僅檢查狀態碼
        if (response.ok) {
          console.log('Request was successful with status code:', response.status);
          // 當狀態碼為 200 時重新整理網頁
          if (response.status === 200) {
            location.reload(); // 重新整理網頁
          }
        } else {
          console.error('Request failed with status code:', response.status);
        }
      })
      .catch(error => console.error('Error:', error));
    });
  });
  