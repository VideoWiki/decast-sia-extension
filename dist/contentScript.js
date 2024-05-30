/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./assets/js/contentScript.js ***!
  \************************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getLocalStorage') {
      // Retrieving data from localStorage
      const accessToken = localStorage.getItem('accessToken');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      // Sending the data back to the background script
      sendResponse({ accessToken, userInfo });
  }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29udGVudFNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24obWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZXRMb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgIC8vIFJldHJpZXZpbmcgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICBjb25zdCB1c2VySW5mbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJJbmZvJykpO1xyXG5cclxuICAgICAgLy8gU2VuZGluZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxyXG4gICAgICBzZW5kUmVzcG9uc2UoeyBhY2Nlc3NUb2tlbiwgdXNlckluZm8gfSk7XHJcbiAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9