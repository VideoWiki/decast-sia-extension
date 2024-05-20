/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/js/background.js ***!
  \*********************************/
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getLocalStorage') {
        // Query all tabs to find the decast.live tab
        chrome.tabs.query({}, function(tabs) {
            let decastTab = null;

            for (let tab of tabs) {
                if (tab.url.includes('decast.live')) {
                    decastTab = tab;
                    break;
                }
            }

            if (decastTab) {
                // Inject content script if not already injected
                chrome.scripting.executeScript({
                    target: { tabId: decastTab.id },
                    files: ['contentScript.js']
                }, () => {
                    // Send a message to the content script to retrieve localStorage data
                    chrome.tabs.sendMessage(decastTab.id, { action: 'getLocalStorage' }, function(response) {
                        // Send the localStorage data back to the popup
                        sendResponse(response);
                    });
                });
            } else {
                console.error('decast.live tab is not open.');
                sendResponse(null);
            }
        });

        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    }
});

// Listen for external messages from the content script
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixxQkFBcUI7QUFDbkQ7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSw0REFBNEQsMkJBQTJCO0FBQ3ZGO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gdGhlIHBvcHVwIHNjcmlwdFxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24obWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gJ2dldExvY2FsU3RvcmFnZScpIHtcclxuICAgICAgICAvLyBRdWVyeSBhbGwgdGFicyB0byBmaW5kIHRoZSBkZWNhc3QubGl2ZSB0YWJcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgZnVuY3Rpb24odGFicykge1xyXG4gICAgICAgICAgICBsZXQgZGVjYXN0VGFiID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFiLnVybC5pbmNsdWRlcygnZGVjYXN0LmxpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlY2FzdFRhYiA9IHRhYjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRlY2FzdFRhYikge1xyXG4gICAgICAgICAgICAgICAgLy8gSW5qZWN0IGNvbnRlbnQgc2NyaXB0IGlmIG5vdCBhbHJlYWR5IGluamVjdGVkXHJcbiAgICAgICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB0YWJJZDogZGVjYXN0VGFiLmlkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZXM6IFsnY29udGVudFNjcmlwdC5qcyddXHJcbiAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIGNvbnRlbnQgc2NyaXB0IHRvIHJldHJpZXZlIGxvY2FsU3RvcmFnZSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoZGVjYXN0VGFiLmlkLCB7IGFjdGlvbjogJ2dldExvY2FsU3RvcmFnZScgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCB0aGUgbG9jYWxTdG9yYWdlIGRhdGEgYmFjayB0byB0aGUgcG9wdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZGVjYXN0LmxpdmUgdGFiIGlzIG5vdCBvcGVuLicpO1xyXG4gICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0cnVlIHRvIGluZGljYXRlIHRoYXQgc2VuZFJlc3BvbnNlIHdpbGwgYmUgY2FsbGVkIGFzeW5jaHJvbm91c2x5XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gTGlzdGVuIGZvciBleHRlcm5hbCBtZXNzYWdlcyBmcm9tIHRoZSBjb250ZW50IHNjcmlwdFxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbC5hZGRMaXN0ZW5lcihmdW5jdGlvbihtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSAnZ2V0TG9jYWxTdG9yYWdlJykge1xyXG4gICAgICAgIC8vIFJldHJpZXZlIGRhdGEgZnJvbSBsb2NhbFN0b3JhZ2VcclxuICAgICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhY2Nlc3NUb2tlbicpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbmZvID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXNlckluZm8nKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGhlIGRhdGEgYmFjayB0byB0aGUgYmFja2dyb3VuZCBzY3JpcHRcclxuICAgICAgICBzZW5kUmVzcG9uc2UoeyBhY2Nlc3NUb2tlbiwgdXNlckluZm8gfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=