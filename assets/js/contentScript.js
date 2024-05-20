chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getLocalStorage') {
      // Retrieving data from localStorage
      const accessToken = localStorage.getItem('accessToken');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // Sending the data back to the background script
      sendResponse({ accessToken, userInfo });
  }
});
