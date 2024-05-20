/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./assets/js/contentScript.js ***!
  \************************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getLocalStorage') {
      // Retrieve data from localStorage
      const accessToken = localStorage.getItem('accessToken');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // Send the data back to the background script
      sendResponse({ accessToken, userInfo });
  }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29udGVudFNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24obWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZXRMb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgIC8vIFJldHJpZXZlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYWNjZXNzVG9rZW4nKTtcclxuICAgICAgY29uc3QgdXNlckluZm8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySW5mbycpKTtcclxuXHJcbiAgICAgIC8vIFNlbmQgdGhlIGRhdGEgYmFjayB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHRcclxuICAgICAgc2VuZFJlc3BvbnNlKHsgYWNjZXNzVG9rZW4sIHVzZXJJbmZvIH0pO1xyXG4gIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==