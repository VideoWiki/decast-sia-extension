/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/js/background.js ***!
  \*********************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getLocalStorage') {
        // Checking if already have stored data
        chrome.storage.local.get(['accessToken', 'userInfo'], function(items) {
            if (items.accessToken && items.userInfo) {
                sendResponse({ accessToken: items.accessToken, userInfo: items.userInfo });
            } else {
                // query for the decast tab
                chrome.tabs.query({}, function(tabs) {
                    let decastTab = null;

                    for (let tab of tabs) {
                        if (tab.url.includes('decast.live')) {
                            decastTab = tab;
                            break;
                        }
                    }

                    if (decastTab) {
                        // Injecting content script
                        chrome.scripting.executeScript({
                            target: { tabId: decastTab.id },
                            files: ['contentScript.js']
                        }, () => {
                            chrome.tabs.sendMessage(decastTab.id, { action: 'getLocalStorage' }, function(response) {
                                if (response && response.accessToken && response.userInfo) {
                                    // Storing the retrieved data
                                    chrome.storage.local.set({ accessToken: response.accessToken, userInfo: response.userInfo }, function() {
                                        // Sending the stored data back to the popup
                                        sendResponse(response);
                                    });
                                } else {
                                    console.error('Failed to retrieve data from decast.live.');
                                    sendResponse(null);
                                }
                            });
                        });
                    } else {
                        console.error('decast.live tab is not open.');
                        sendResponse(null);
                    }
                });
            }
        });

        return true;
    }
});

// Listening for external messages from the content script
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getLocalStorage') {
        // Retrieve data from localStorage
        const accessToken = localStorage.getItem('accessToken');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Sending the data back to the background script
        sendResponse({ accessToken, userInfo });
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMERBQTBEO0FBQ3pGLGNBQWM7QUFDZDtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MscUJBQXFCO0FBQzNEO0FBQ0EseUJBQXlCO0FBQ3pCLG9FQUFvRSwyQkFBMkI7QUFDL0Y7QUFDQTtBQUNBLCtEQUErRCxnRUFBZ0U7QUFDL0g7QUFDQTtBQUNBLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsdUJBQXVCO0FBQzlDO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnZ2V0TG9jYWxTdG9yYWdlJykge1xyXG4gICAgICAgIC8vIENoZWNraW5nIGlmIGFscmVhZHkgaGF2ZSBzdG9yZWQgZGF0YVxyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbJ2FjY2Vzc1Rva2VuJywgJ3VzZXJJbmZvJ10sIGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5hY2Nlc3NUb2tlbiAmJiBpdGVtcy51c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHsgYWNjZXNzVG9rZW46IGl0ZW1zLmFjY2Vzc1Rva2VuLCB1c2VySW5mbzogaXRlbXMudXNlckluZm8gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBxdWVyeSBmb3IgdGhlIGRlY2FzdCB0YWJcclxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCBmdW5jdGlvbih0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2FzdFRhYiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIudXJsLmluY2x1ZGVzKCdkZWNhc3QubGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNhc3RUYWIgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2FzdFRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJbmplY3RpbmcgY29udGVudCBzY3JpcHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB0YWJJZDogZGVjYXN0VGFiLmlkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogWydjb250ZW50U2NyaXB0LmpzJ11cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoZGVjYXN0VGFiLmlkLCB7IGFjdGlvbjogJ2dldExvY2FsU3RvcmFnZScgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWNjZXNzVG9rZW4gJiYgcmVzcG9uc2UudXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmluZyB0aGUgcmV0cmlldmVkIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgYWNjZXNzVG9rZW46IHJlc3BvbnNlLmFjY2Vzc1Rva2VuLCB1c2VySW5mbzogcmVzcG9uc2UudXNlckluZm8gfSwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZW5kaW5nIHRoZSBzdG9yZWQgZGF0YSBiYWNrIHRvIHRoZSBwb3B1cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJldHJpZXZlIGRhdGEgZnJvbSBkZWNhc3QubGl2ZS4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdkZWNhc3QubGl2ZSB0YWIgaXMgbm90IG9wZW4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBMaXN0ZW5pbmcgZm9yIGV4dGVybmFsIG1lc3NhZ2VzIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsLmFkZExpc3RlbmVyKGZ1bmN0aW9uKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZXRMb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgICAgLy8gUmV0cmlldmUgZGF0YSBmcm9tIGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FjY2Vzc1Rva2VuJyk7XHJcbiAgICAgICAgY29uc3QgdXNlckluZm8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VySW5mbycpKTtcclxuXHJcbiAgICAgICAgLy8gU2VuZGluZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7IGFjY2Vzc1Rva2VuLCB1c2VySW5mbyB9KTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==