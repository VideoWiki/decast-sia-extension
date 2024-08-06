/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./assets/js/background.js ***!
  \*********************************/
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "getLocalStorage") {
    chrome.storage.local.get(["accessToken", "userInfo"], function (items) {
      if (items.accessToken && items.userInfo) {
        sendResponse({
          accessToken: items.accessToken,
          userInfo: items.userInfo,
        });
      } else {
        chrome.tabs.query({}, function (tabs) {
          let decastTab = null;

          for (let tab of tabs) {
            if (tab.url.includes("https://decast.live/")) {
              decastTab = tab;
              break;
            }
          }

          if (decastTab) {
            chrome.scripting.executeScript(
              {
                target: { tabId: decastTab.id },
                files: ["contentScript.js"],
              },
              () => {
                chrome.tabs.sendMessage(
                  decastTab.id,
                  { action: "getLocalStorage" },
                  function (response) {
                    if (response && response.accessToken && response.userInfo) {
                      chrome.storage.local.set(
                        {
                          accessToken: response.accessToken,
                          userInfo: response.userInfo,
                        },
                        function () {
                          sendResponse(response);
                        }
                      );
                    } else {
                      console.error(
                        "Failed to retrieve data from decast.live."
                      );
                      sendResponse(null);
                    }
                  }
                );
              }
            );
          } else {
            console.error("decast.live tab is not open.");
            sendResponse(null);
          }
        });
      }
    });

    return true;
  }
    if (message.action === "updateBadge") {
      if (message.badgeType === "cast") {
        fetchGasPrices();
      } else{
        fetchGasPrices();
      }
    }   
});

// Listening for external messages from the content script
chrome.runtime.onMessageExternal.addListener(function (
  message,
  sender,
  sendResponse
) {
  if (message.action === "getLocalStorage") {
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    sendResponse({ accessToken, userInfo });
  }
});

chrome.alarms.create("fetchGasPrices", { periodInMinutes: 1.5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "fetchGasPrices") {
    fetchGasPrices();
  }
});

async function fetchGasPrices() {
  try {
    const url =
      "https://api.blocknative.com/gasprices/blockprices?confidenceLevels=99&confidenceLevels=90&confidenceLevels=80&confidenceLevels=60";
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.blockPrices) {
      const blockPrices = data.blockPrices[0].estimatedPrices;
      const normalPrice = blockPrices.find((price) => price.confidence === 90);

      if (normalPrice) {
        const gasPrice = normalPrice.price;
        updateBadge(gasPrice);
        chrome.storage.local.set({ gasPrices: blockPrices });
        chrome.runtime.sendMessage({ action: "updateGasPrices" });
      }
    } else {
      console.error("No gas price data available");
    }
  } catch (error) {
    console.error("Error fetching gas prices:", error);
  }
}

function updateBadge(gasPrice) {
  chrome.action.setBadgeText({ text: gasPrice.toString() });
  chrome.action.setBadgeBackgroundColor({ color: "#ffffff" });
}

function setCastBadge() {
  chrome.action.setBadgeBackgroundColor({ color: "#ff0000" });
}


chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("latestGasPrice", (data) => {
    if (data.latestGasPrice) {
      updateBadge(data.latestGasPrice);
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  fetchGasPrices();
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsdUJBQXVCO0FBQzFDO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUNBQXlDLHNCQUFzQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3QkFBd0I7QUFDM0QscUNBQXFDLDJCQUEyQjtBQUNoRTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsMkJBQTJCO0FBQzFELDBDQUEwQyxrQkFBa0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2JhY2tncm91bmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJnZXRMb2NhbFN0b3JhZ2VcIikge1xyXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImFjY2Vzc1Rva2VuXCIsIFwidXNlckluZm9cIl0sIGZ1bmN0aW9uIChpdGVtcykge1xyXG4gICAgICBpZiAoaXRlbXMuYWNjZXNzVG9rZW4gJiYgaXRlbXMudXNlckluZm8pIHtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe1xyXG4gICAgICAgICAgYWNjZXNzVG9rZW46IGl0ZW1zLmFjY2Vzc1Rva2VuLFxyXG4gICAgICAgICAgdXNlckluZm86IGl0ZW1zLnVzZXJJbmZvLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHt9LCBmdW5jdGlvbiAodGFicykge1xyXG4gICAgICAgICAgbGV0IGRlY2FzdFRhYiA9IG51bGw7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgdGFiIG9mIHRhYnMpIHtcclxuICAgICAgICAgICAgaWYgKHRhYi51cmwuaW5jbHVkZXMoXCJodHRwczovL2RlY2FzdC5saXZlL1wiKSkge1xyXG4gICAgICAgICAgICAgIGRlY2FzdFRhYiA9IHRhYjtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChkZWNhc3RUYWIpIHtcclxuICAgICAgICAgICAgY2hyb21lLnNjcmlwdGluZy5leGVjdXRlU2NyaXB0KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogeyB0YWJJZDogZGVjYXN0VGFiLmlkIH0sXHJcbiAgICAgICAgICAgICAgICBmaWxlczogW1wiY29udGVudFNjcmlwdC5qc1wiXSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgICBkZWNhc3RUYWIuaWQsXHJcbiAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBcImdldExvY2FsU3RvcmFnZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5hY2Nlc3NUb2tlbiAmJiByZXNwb25zZS51c2VySW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46IHJlc3BvbnNlLmFjY2Vzc1Rva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvOiByZXNwb25zZS51c2VySW5mbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiRmFpbGVkIHRvIHJldHJpZXZlIGRhdGEgZnJvbSBkZWNhc3QubGl2ZS5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHNlbmRSZXNwb25zZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImRlY2FzdC5saXZlIHRhYiBpcyBub3Qgb3Blbi5cIik7XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZShudWxsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gICAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcInVwZGF0ZUJhZGdlXCIpIHtcclxuICAgICAgaWYgKG1lc3NhZ2UuYmFkZ2VUeXBlID09PSBcImNhc3RcIikge1xyXG4gICAgICAgIGZldGNoR2FzUHJpY2VzKCk7XHJcbiAgICAgIH0gZWxzZXtcclxuICAgICAgICBmZXRjaEdhc1ByaWNlcygpO1xyXG4gICAgICB9XHJcbiAgICB9ICAgXHJcbn0pO1xyXG5cclxuLy8gTGlzdGVuaW5nIGZvciBleHRlcm5hbCBtZXNzYWdlcyBmcm9tIHRoZSBjb250ZW50IHNjcmlwdFxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2VFeHRlcm5hbC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoXHJcbiAgbWVzc2FnZSxcclxuICBzZW5kZXIsXHJcbiAgc2VuZFJlc3BvbnNlXHJcbikge1xyXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJnZXRMb2NhbFN0b3JhZ2VcIikge1xyXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjY2Vzc1Rva2VuXCIpO1xyXG4gICAgY29uc3QgdXNlckluZm8gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlckluZm9cIikpO1xyXG4gICAgc2VuZFJlc3BvbnNlKHsgYWNjZXNzVG9rZW4sIHVzZXJJbmZvIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLmNyZWF0ZShcImZldGNoR2FzUHJpY2VzXCIsIHsgcGVyaW9kSW5NaW51dGVzOiAxLjUgfSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XHJcbiAgaWYgKGFsYXJtLm5hbWUgPT09IFwiZmV0Y2hHYXNQcmljZXNcIikge1xyXG4gICAgZmV0Y2hHYXNQcmljZXMoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hHYXNQcmljZXMoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIFwiaHR0cHM6Ly9hcGkuYmxvY2tuYXRpdmUuY29tL2dhc3ByaWNlcy9ibG9ja3ByaWNlcz9jb25maWRlbmNlTGV2ZWxzPTk5JmNvbmZpZGVuY2VMZXZlbHM9OTAmY29uZmlkZW5jZUxldmVscz04MCZjb25maWRlbmNlTGV2ZWxzPTYwXCI7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGlmIChkYXRhICYmIGRhdGEuYmxvY2tQcmljZXMpIHtcclxuICAgICAgY29uc3QgYmxvY2tQcmljZXMgPSBkYXRhLmJsb2NrUHJpY2VzWzBdLmVzdGltYXRlZFByaWNlcztcclxuICAgICAgY29uc3Qgbm9ybWFsUHJpY2UgPSBibG9ja1ByaWNlcy5maW5kKChwcmljZSkgPT4gcHJpY2UuY29uZmlkZW5jZSA9PT0gOTApO1xyXG5cclxuICAgICAgaWYgKG5vcm1hbFByaWNlKSB7XHJcbiAgICAgICAgY29uc3QgZ2FzUHJpY2UgPSBub3JtYWxQcmljZS5wcmljZTtcclxuICAgICAgICB1cGRhdGVCYWRnZShnYXNQcmljZSk7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgZ2FzUHJpY2VzOiBibG9ja1ByaWNlcyB9KTtcclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IGFjdGlvbjogXCJ1cGRhdGVHYXNQcmljZXNcIiB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIk5vIGdhcyBwcmljZSBkYXRhIGF2YWlsYWJsZVwiKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGdhcyBwcmljZXM6XCIsIGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUJhZGdlKGdhc1ByaWNlKSB7XHJcbiAgY2hyb21lLmFjdGlvbi5zZXRCYWRnZVRleHQoeyB0ZXh0OiBnYXNQcmljZS50b1N0cmluZygpIH0pO1xyXG4gIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjZmZmZmZmXCIgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENhc3RCYWRnZSgpIHtcclxuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiI2ZmMDAwMFwiIH0pO1xyXG59XHJcblxyXG5cclxuY2hyb21lLnJ1bnRpbWUub25TdGFydHVwLmFkZExpc3RlbmVyKCgpID0+IHtcclxuICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoXCJsYXRlc3RHYXNQcmljZVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgaWYgKGRhdGEubGF0ZXN0R2FzUHJpY2UpIHtcclxuICAgICAgdXBkYXRlQmFkZ2UoZGF0YS5sYXRlc3RHYXNQcmljZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG5cclxuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGZldGNoR2FzUHJpY2VzKCk7XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=