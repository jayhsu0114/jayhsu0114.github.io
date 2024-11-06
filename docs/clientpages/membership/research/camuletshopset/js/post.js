// 載入頁面後在 localStorage 中新增 shopcode 值
localStorage.setItem('shopcode', 'camulet20241106');

// 在 footer 之前插入店家驗證設置成功的訊息
document.querySelector('footer').insertAdjacentHTML('beforebegin', '<center><p>店家驗證設置成功</p></center>');
