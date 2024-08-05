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
        setCastBadge();
      } else{
        fetchGasPrices();
      }
    }
//   if (message.action === "updateBadge") {
//     if (message.badgeType === "cast") {
//       updateBadge(message.badgeType);
//       fetchGasPrices(); 
//     }else{
//         fetchGasPrices(); 
//     }
//   }
   
});

// Listening for external messages from the content script
chrome.runtime.onMessageExternal.addListener(function (
  message,
  sender,
  sendResponse
) {
  if (message.action === "getLocalStorage") {
    // Retrieve data from localStorage
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Sending the data back to the background script
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
        // Store gas prices in chrome.storage.local
        chrome.storage.local.set({ gasPrices: blockPrices });

        // Notify popup about the update
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

// function updateBadge(badgeType, gasPrice) {
//     if (badgeType === 'gas') {
//       chrome.action.setBadgeText({ text: gasPrice.toString() });
//       chrome.action.setBadgeBackgroundColor({ color: "#ffffff" }); 
//     } else if (badgeType === 'cast') {
//       chrome.action.setBadgeText({ text: gasPrice.toString() });
//       chrome.action.setBadgeBackgroundColor({ color: "#ff0000" }); 
//     }
//   }

function setCastBadge() {
  chrome.action.setBadgeBackgroundColor({ color: "#ff0000" });
  chrome.action.setBadgeTextColor({ color: "#ffffff" });
  setTimeout(() => {
    fetchGasPrices();
  }, 300000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsc0JBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0JBQXdCO0FBQzNEO0FBQ0E7QUFDQSxxQ0FBcUMsMkJBQTJCO0FBQ2hFO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwyQkFBMkI7QUFDMUQsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywyQkFBMkI7QUFDakUsaURBQWlELGtCQUFrQjtBQUNuRSxTQUFTO0FBQ1Qsc0NBQXNDLDJCQUEyQjtBQUNqRSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RCxvQ0FBb0Msa0JBQWtCO0FBQ3REO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9qcy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAobWVzc2FnZSwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwiZ2V0TG9jYWxTdG9yYWdlXCIpIHtcclxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbXCJhY2Nlc3NUb2tlblwiLCBcInVzZXJJbmZvXCJdLCBmdW5jdGlvbiAoaXRlbXMpIHtcclxuICAgICAgaWYgKGl0ZW1zLmFjY2Vzc1Rva2VuICYmIGl0ZW1zLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHtcclxuICAgICAgICAgIGFjY2Vzc1Rva2VuOiBpdGVtcy5hY2Nlc3NUb2tlbixcclxuICAgICAgICAgIHVzZXJJbmZvOiBpdGVtcy51c2VySW5mbyxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7fSwgZnVuY3Rpb24gKHRhYnMpIHtcclxuICAgICAgICAgIGxldCBkZWNhc3RUYWIgPSBudWxsO1xyXG5cclxuICAgICAgICAgIGZvciAobGV0IHRhYiBvZiB0YWJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0YWIudXJsLmluY2x1ZGVzKFwiaHR0cHM6Ly9kZWNhc3QubGl2ZS9cIikpIHtcclxuICAgICAgICAgICAgICBkZWNhc3RUYWIgPSB0YWI7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZGVjYXN0VGFiKSB7XHJcbiAgICAgICAgICAgIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdChcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdGFiSWQ6IGRlY2FzdFRhYi5pZCB9LFxyXG4gICAgICAgICAgICAgICAgZmlsZXM6IFtcImNvbnRlbnRTY3JpcHQuanNcIl0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5zZW5kTWVzc2FnZShcclxuICAgICAgICAgICAgICAgICAgZGVjYXN0VGFiLmlkLFxyXG4gICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJnZXRMb2NhbFN0b3JhZ2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuYWNjZXNzVG9rZW4gJiYgcmVzcG9uc2UudXNlckluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5hY2Nlc3NUb2tlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VySW5mbzogcmVzcG9uc2UudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkZhaWxlZCB0byByZXRyaWV2ZSBkYXRhIGZyb20gZGVjYXN0LmxpdmUuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzZW5kUmVzcG9uc2UobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJkZWNhc3QubGl2ZSB0YWIgaXMgbm90IG9wZW4uXCIpO1xyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJ1cGRhdGVCYWRnZVwiKSB7XHJcbiAgICAgIGlmIChtZXNzYWdlLmJhZGdlVHlwZSA9PT0gXCJjYXN0XCIpIHtcclxuICAgICAgICBzZXRDYXN0QmFkZ2UoKTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIGZldGNoR2FzUHJpY2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuLy8gICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwidXBkYXRlQmFkZ2VcIikge1xyXG4vLyAgICAgaWYgKG1lc3NhZ2UuYmFkZ2VUeXBlID09PSBcImNhc3RcIikge1xyXG4vLyAgICAgICB1cGRhdGVCYWRnZShtZXNzYWdlLmJhZGdlVHlwZSk7XHJcbi8vICAgICAgIGZldGNoR2FzUHJpY2VzKCk7IFxyXG4vLyAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgZmV0Y2hHYXNQcmljZXMoKTsgXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4gICBcclxufSk7XHJcblxyXG4vLyBMaXN0ZW5pbmcgZm9yIGV4dGVybmFsIG1lc3NhZ2VzIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChcclxuICBtZXNzYWdlLFxyXG4gIHNlbmRlcixcclxuICBzZW5kUmVzcG9uc2VcclxuKSB7XHJcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcImdldExvY2FsU3RvcmFnZVwiKSB7XHJcbiAgICAvLyBSZXRyaWV2ZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWNjZXNzVG9rZW5cIik7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VySW5mb1wiKSk7XHJcblxyXG4gICAgLy8gU2VuZGluZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxyXG4gICAgc2VuZFJlc3BvbnNlKHsgYWNjZXNzVG9rZW4sIHVzZXJJbmZvIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLmNyZWF0ZShcImZldGNoR2FzUHJpY2VzXCIsIHsgcGVyaW9kSW5NaW51dGVzOiAxLjUgfSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XHJcbiAgaWYgKGFsYXJtLm5hbWUgPT09IFwiZmV0Y2hHYXNQcmljZXNcIikge1xyXG4gICAgZmV0Y2hHYXNQcmljZXMoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hHYXNQcmljZXMoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIFwiaHR0cHM6Ly9hcGkuYmxvY2tuYXRpdmUuY29tL2dhc3ByaWNlcy9ibG9ja3ByaWNlcz9jb25maWRlbmNlTGV2ZWxzPTk5JmNvbmZpZGVuY2VMZXZlbHM9OTAmY29uZmlkZW5jZUxldmVscz04MCZjb25maWRlbmNlTGV2ZWxzPTYwXCI7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGlmIChkYXRhICYmIGRhdGEuYmxvY2tQcmljZXMpIHtcclxuICAgICAgY29uc3QgYmxvY2tQcmljZXMgPSBkYXRhLmJsb2NrUHJpY2VzWzBdLmVzdGltYXRlZFByaWNlcztcclxuICAgICAgY29uc3Qgbm9ybWFsUHJpY2UgPSBibG9ja1ByaWNlcy5maW5kKChwcmljZSkgPT4gcHJpY2UuY29uZmlkZW5jZSA9PT0gOTApO1xyXG5cclxuICAgICAgaWYgKG5vcm1hbFByaWNlKSB7XHJcbiAgICAgICAgY29uc3QgZ2FzUHJpY2UgPSBub3JtYWxQcmljZS5wcmljZTtcclxuICAgICAgICB1cGRhdGVCYWRnZShnYXNQcmljZSk7XHJcbiAgICAgICAgLy8gU3RvcmUgZ2FzIHByaWNlcyBpbiBjaHJvbWUuc3RvcmFnZS5sb2NhbFxyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGdhc1ByaWNlczogYmxvY2tQcmljZXMgfSk7XHJcblxyXG4gICAgICAgIC8vIE5vdGlmeSBwb3B1cCBhYm91dCB0aGUgdXBkYXRlXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246IFwidXBkYXRlR2FzUHJpY2VzXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBnYXMgcHJpY2UgZGF0YSBhdmFpbGFibGVcIik7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBnYXMgcHJpY2VzOlwiLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCYWRnZShnYXNQcmljZSkge1xyXG4gIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogZ2FzUHJpY2UudG9TdHJpbmcoKSB9KTtcclxuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiI2ZmZmZmZlwiIH0pO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB1cGRhdGVCYWRnZShiYWRnZVR5cGUsIGdhc1ByaWNlKSB7XHJcbi8vICAgICBpZiAoYmFkZ2VUeXBlID09PSAnZ2FzJykge1xyXG4vLyAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGdhc1ByaWNlLnRvU3RyaW5nKCkgfSk7XHJcbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjZmZmZmZmXCIgfSk7IFxyXG4vLyAgICAgfSBlbHNlIGlmIChiYWRnZVR5cGUgPT09ICdjYXN0Jykge1xyXG4vLyAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGdhc1ByaWNlLnRvU3RyaW5nKCkgfSk7XHJcbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjZmYwMDAwXCIgfSk7IFxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuXHJcbmZ1bmN0aW9uIHNldENhc3RCYWRnZSgpIHtcclxuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiI2ZmMDAwMFwiIH0pO1xyXG4gIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0Q29sb3IoeyBjb2xvcjogXCIjZmZmZmZmXCIgfSk7XHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBmZXRjaEdhc1ByaWNlcygpO1xyXG4gIH0sIDMwMDAwMCk7XHJcbn1cclxuXHJcblxyXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcImxhdGVzdEdhc1ByaWNlXCIsIChkYXRhKSA9PiB7XHJcbiAgICBpZiAoZGF0YS5sYXRlc3RHYXNQcmljZSkge1xyXG4gICAgICB1cGRhdGVCYWRnZShkYXRhLmxhdGVzdEdhc1ByaWNlKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgZmV0Y2hHYXNQcmljZXMoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==