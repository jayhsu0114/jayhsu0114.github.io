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
    
    // 在控制台打印 JSON 物件
    console.log('JSON Data:', jsonData); // 打印原始 JSON 物件以檢查

    // 發送 POST 請求
    fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/test-anonymity-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonString
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
  });
});
