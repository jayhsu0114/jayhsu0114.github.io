document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('edit-end').querySelector('button').addEventListener('click', function() {
      const storageKeys = Object.keys(sessionStorage);
      const jsonData = {};
  
      storageKeys.forEach(key => {
        // 過濾掉不需要的鍵
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
  
      // 在控制台打印 JSON
      console.log('JSON Data:', jsonString);
  
      // 發送 POST 請求
      fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonString
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    });
  });