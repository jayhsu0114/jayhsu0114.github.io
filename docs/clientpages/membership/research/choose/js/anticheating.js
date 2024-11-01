if (sessionStorage.getItem('strategy')) {
    window.location.href = '/clientpages/membership/research/exchange';
  } else {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch('https://google-sheets-proxy-mk66ircp2a-uc.a.run.app/membership-anticheating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })
        .then(response => response.json())
        .then(data => {
          if (data.strategy) {
            sessionStorage.setItem('strategy', data.strategy);
            window.location.href = '/clientpages/membership/research/exchange';
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  