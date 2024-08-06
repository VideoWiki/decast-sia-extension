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
  // chrome.action.setBadgeTextColor({ color: "#ffffff" });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVE7QUFDUiw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsc0JBQXNCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0JBQXdCO0FBQzNEO0FBQ0E7QUFDQSxxQ0FBcUMsMkJBQTJCO0FBQ2hFO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiwyQkFBMkI7QUFDMUQsMENBQTBDLGtCQUFrQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywyQkFBMkI7QUFDakUsaURBQWlELGtCQUFrQjtBQUNuRSxTQUFTO0FBQ1Qsc0NBQXNDLDJCQUEyQjtBQUNqRSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGtCQUFrQjtBQUM1RCx1Q0FBdUMsa0JBQWtCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvYmFja2dyb3VuZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcImdldExvY2FsU3RvcmFnZVwiKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoW1wiYWNjZXNzVG9rZW5cIiwgXCJ1c2VySW5mb1wiXSwgZnVuY3Rpb24gKGl0ZW1zKSB7XHJcbiAgICAgIGlmIChpdGVtcy5hY2Nlc3NUb2tlbiAmJiBpdGVtcy51c2VySW5mbykge1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7XHJcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogaXRlbXMuYWNjZXNzVG9rZW4sXHJcbiAgICAgICAgICB1c2VySW5mbzogaXRlbXMudXNlckluZm8sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoe30sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICAgICAgICBsZXQgZGVjYXN0VGFiID0gbnVsbDtcclxuXHJcbiAgICAgICAgICBmb3IgKGxldCB0YWIgb2YgdGFicykge1xyXG4gICAgICAgICAgICBpZiAodGFiLnVybC5pbmNsdWRlcyhcImh0dHBzOi8vZGVjYXN0LmxpdmUvXCIpKSB7XHJcbiAgICAgICAgICAgICAgZGVjYXN0VGFiID0gdGFiO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGRlY2FzdFRhYikge1xyXG4gICAgICAgICAgICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHRhYklkOiBkZWNhc3RUYWIuaWQgfSxcclxuICAgICAgICAgICAgICAgIGZpbGVzOiBbXCJjb250ZW50U2NyaXB0LmpzXCJdLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICAgIGRlY2FzdFRhYi5pZCxcclxuICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiZ2V0TG9jYWxTdG9yYWdlXCIgfSxcclxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmFjY2Vzc1Rva2VuICYmIHJlc3BvbnNlLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYWNjZXNzVG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlckluZm86IHJlc3BvbnNlLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJGYWlsZWQgdG8gcmV0cmlldmUgZGF0YSBmcm9tIGRlY2FzdC5saXZlLlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZGVjYXN0LmxpdmUgdGFiIGlzIG5vdCBvcGVuLlwiKTtcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKG51bGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwidXBkYXRlQmFkZ2VcIikge1xyXG4gICAgICBpZiAobWVzc2FnZS5iYWRnZVR5cGUgPT09IFwiY2FzdFwiKSB7XHJcbiAgICAgICAgZmV0Y2hHYXNQcmljZXMoKTtcclxuICAgICAgfSBlbHNle1xyXG4gICAgICAgIGZldGNoR2FzUHJpY2VzKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuLy8gICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwidXBkYXRlQmFkZ2VcIikge1xyXG4vLyAgICAgaWYgKG1lc3NhZ2UuYmFkZ2VUeXBlID09PSBcImNhc3RcIikge1xyXG4vLyAgICAgICB1cGRhdGVCYWRnZShtZXNzYWdlLmJhZGdlVHlwZSk7XHJcbi8vICAgICAgIGZldGNoR2FzUHJpY2VzKCk7IFxyXG4vLyAgICAgfWVsc2V7XHJcbi8vICAgICAgICAgZmV0Y2hHYXNQcmljZXMoKTsgXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4gICBcclxufSk7XHJcblxyXG4vLyBMaXN0ZW5pbmcgZm9yIGV4dGVybmFsIG1lc3NhZ2VzIGZyb20gdGhlIGNvbnRlbnQgc2NyaXB0XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZUV4dGVybmFsLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChcclxuICBtZXNzYWdlLFxyXG4gIHNlbmRlcixcclxuICBzZW5kUmVzcG9uc2VcclxuKSB7XHJcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcImdldExvY2FsU3RvcmFnZVwiKSB7XHJcbiAgICAvLyBSZXRyaWV2ZSBkYXRhIGZyb20gbG9jYWxTdG9yYWdlXHJcbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYWNjZXNzVG9rZW5cIik7XHJcbiAgICBjb25zdCB1c2VySW5mbyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VySW5mb1wiKSk7XHJcblxyXG4gICAgLy8gU2VuZGluZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBiYWNrZ3JvdW5kIHNjcmlwdFxyXG4gICAgc2VuZFJlc3BvbnNlKHsgYWNjZXNzVG9rZW4sIHVzZXJJbmZvIH0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLmNyZWF0ZShcImZldGNoR2FzUHJpY2VzXCIsIHsgcGVyaW9kSW5NaW51dGVzOiAxLjUgfSk7XHJcblxyXG5jaHJvbWUuYWxhcm1zLm9uQWxhcm0uYWRkTGlzdGVuZXIoKGFsYXJtKSA9PiB7XHJcbiAgaWYgKGFsYXJtLm5hbWUgPT09IFwiZmV0Y2hHYXNQcmljZXNcIikge1xyXG4gICAgZmV0Y2hHYXNQcmljZXMoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hHYXNQcmljZXMoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHVybCA9XHJcbiAgICAgIFwiaHR0cHM6Ly9hcGkuYmxvY2tuYXRpdmUuY29tL2dhc3ByaWNlcy9ibG9ja3ByaWNlcz9jb25maWRlbmNlTGV2ZWxzPTk5JmNvbmZpZGVuY2VMZXZlbHM9OTAmY29uZmlkZW5jZUxldmVscz04MCZjb25maWRlbmNlTGV2ZWxzPTYwXCI7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XHJcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGlmIChkYXRhICYmIGRhdGEuYmxvY2tQcmljZXMpIHtcclxuICAgICAgY29uc3QgYmxvY2tQcmljZXMgPSBkYXRhLmJsb2NrUHJpY2VzWzBdLmVzdGltYXRlZFByaWNlcztcclxuICAgICAgY29uc3Qgbm9ybWFsUHJpY2UgPSBibG9ja1ByaWNlcy5maW5kKChwcmljZSkgPT4gcHJpY2UuY29uZmlkZW5jZSA9PT0gOTApO1xyXG5cclxuICAgICAgaWYgKG5vcm1hbFByaWNlKSB7XHJcbiAgICAgICAgY29uc3QgZ2FzUHJpY2UgPSBub3JtYWxQcmljZS5wcmljZTtcclxuICAgICAgICB1cGRhdGVCYWRnZShnYXNQcmljZSk7XHJcbiAgICAgICAgLy8gU3RvcmUgZ2FzIHByaWNlcyBpbiBjaHJvbWUuc3RvcmFnZS5sb2NhbFxyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGdhc1ByaWNlczogYmxvY2tQcmljZXMgfSk7XHJcblxyXG4gICAgICAgIC8vIE5vdGlmeSBwb3B1cCBhYm91dCB0aGUgdXBkYXRlXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoeyBhY3Rpb246IFwidXBkYXRlR2FzUHJpY2VzXCIgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJObyBnYXMgcHJpY2UgZGF0YSBhdmFpbGFibGVcIik7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBnYXMgcHJpY2VzOlwiLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCYWRnZShnYXNQcmljZSkge1xyXG4gIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0KHsgdGV4dDogZ2FzUHJpY2UudG9TdHJpbmcoKSB9KTtcclxuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiI2ZmZmZmZlwiIH0pO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiB1cGRhdGVCYWRnZShiYWRnZVR5cGUsIGdhc1ByaWNlKSB7XHJcbi8vICAgICBpZiAoYmFkZ2VUeXBlID09PSAnZ2FzJykge1xyXG4vLyAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGdhc1ByaWNlLnRvU3RyaW5nKCkgfSk7XHJcbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjZmZmZmZmXCIgfSk7IFxyXG4vLyAgICAgfSBlbHNlIGlmIChiYWRnZVR5cGUgPT09ICdjYXN0Jykge1xyXG4vLyAgICAgICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlVGV4dCh7IHRleHQ6IGdhc1ByaWNlLnRvU3RyaW5nKCkgfSk7XHJcbi8vICAgICAgIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VCYWNrZ3JvdW5kQ29sb3IoeyBjb2xvcjogXCIjZmYwMDAwXCIgfSk7IFxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuXHJcbmZ1bmN0aW9uIHNldENhc3RCYWRnZSgpIHtcclxuICBjaHJvbWUuYWN0aW9uLnNldEJhZGdlQmFja2dyb3VuZENvbG9yKHsgY29sb3I6IFwiI2ZmMDAwMFwiIH0pO1xyXG4gIC8vIGNocm9tZS5hY3Rpb24uc2V0QmFkZ2VUZXh0Q29sb3IoeyBjb2xvcjogXCIjZmZmZmZmXCIgfSk7XHJcbn1cclxuXHJcblxyXG5jaHJvbWUucnVudGltZS5vblN0YXJ0dXAuYWRkTGlzdGVuZXIoKCkgPT4ge1xyXG4gIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcImxhdGVzdEdhc1ByaWNlXCIsIChkYXRhKSA9PiB7XHJcbiAgICBpZiAoZGF0YS5sYXRlc3RHYXNQcmljZSkge1xyXG4gICAgICB1cGRhdGVCYWRnZShkYXRhLmxhdGVzdEdhc1ByaWNlKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5jaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgZmV0Y2hHYXNQcmljZXMoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==