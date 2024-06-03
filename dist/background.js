/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/js/background.js ***!
  \*********************************/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getLocalStorage') {
        chrome.storage.local.get(['accessToken', 'userInfo'], function(items) {
            if (items.accessToken && items.userInfo) {
                sendResponse({ accessToken: items.accessToken, userInfo: items.userInfo });
            } else {
                chrome.tabs.query({}, function(tabs) {
                    let decastTab = null;

                    for (let tab of tabs) {
                        if (tab.url.includes('https://decast.live/')) {
                            decastTab = tab;
                            break;
                        }
                    }

                    if (decastTab) {
                        chrome.scripting.executeScript({
                            target: { tabId: decastTab.id },
                            files: ['contentScript.js']
                        }, () => {
                            chrome.tabs.sendMessage(decastTab.id, { action: 'getLocalStorage' }, function(response) {
                                if (response && response.accessToken && response.userInfo) {
                                    chrome.storage.local.set({ accessToken: response.accessToken, userInfo: response.userInfo }, function() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDBEQUEwRDtBQUN6RixjQUFjO0FBQ2Qsb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MscUJBQXFCO0FBQzNEO0FBQ0EseUJBQXlCO0FBQ3pCLG9FQUFvRSwyQkFBMkI7QUFDL0Y7QUFDQSwrREFBK0QsZ0VBQWdFO0FBQy9IO0FBQ0EscUNBQXFDO0FBQ3JDLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUM7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09ICdnZXRMb2NhbFN0b3JhZ2UnKSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFsnYWNjZXNzVG9rZW4nLCAndXNlckluZm8nXSwgZnVuY3Rpb24oaXRlbXMpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zLmFjY2Vzc1Rva2VuICYmIGl0ZW1zLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBhY2Nlc3NUb2tlbjogaXRlbXMuYWNjZXNzVG9rZW4sIHVzZXJJbmZvOiBpdGVtcy51c2VySW5mbyB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCBmdW5jdGlvbih0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlY2FzdFRhYiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YWIudXJsLmluY2x1ZGVzKCdodHRwczovL2RlY2FzdC5saXZlLycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNhc3RUYWIgPSB0YWI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2FzdFRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiBkZWNhc3RUYWIuaWQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbJ2NvbnRlbnRTY3JpcHQuanMnXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShkZWNhc3RUYWIuaWQsIHsgYWN0aW9uOiAnZ2V0TG9jYWxTdG9yYWdlJyB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5hY2Nlc3NUb2tlbiAmJiByZXNwb25zZS51c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYWNjZXNzVG9rZW4sIHVzZXJJbmZvOiByZXNwb25zZS51c2VySW5mbyB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byByZXRyaWV2ZSBkYXRhIGZyb20gZGVjYXN0LmxpdmUuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGVjYXN0LmxpdmUgdGFiIGlzIG5vdCBvcGVuLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gTGlzdGVuaW5nIGZvciBleHRlcm5hbCBtZXNzYWdlcyBmcm9tIHRoZSBjb250ZW50IHNjcmlwdFxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbC5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnZ2V0TG9jYWxTdG9yYWdlJykge1xyXG4gICAgICAgIC8vIFJldHJpZXZlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckluZm8nKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbmRpbmcgdGhlIGRhdGEgYmFjayB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHRcclxuICAgICAgICBzZW5kUmVzcG9uc2UoeyBhY2Nlc3NUb2tlbiwgdXNlckluZm8gfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=