
  // 解析 URL 参数
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // 获取 route 参数并存入 session storage
  const routeValue = getUrlParameter('route');
  if (routeValue) {
    sessionStorage.setItem('route', routeValue);
  }

  // 设置 nextpage 的 session storage 值为 "strategychoose"
  sessionStorage.setItem('nextpage', 'strategychoose');

  // 跳转到目标页面
  window.location.href = '/clientpages/membership/authentication/signin';
