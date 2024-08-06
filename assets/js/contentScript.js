chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getLocalStorage') {
      const accessToken = localStorage.getItem('accessToken');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      sendResponse({ accessToken, userInfo });
  }
});
