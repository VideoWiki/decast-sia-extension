/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./assets/js/contentScript.js ***!
  \************************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'getLocalStorage') {
      const accessToken = localStorage.getItem('accessToken');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      sendResponse({ accessToken, userInfo });
  }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29udGVudFNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24obWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZXRMb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcbiAgICAgIGNvbnN0IHVzZXJJbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckluZm8nKSk7XHJcbiAgICAgIHNlbmRSZXNwb25zZSh7IGFjY2Vzc1Rva2VuLCB1c2VySW5mbyB9KTtcclxuICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=