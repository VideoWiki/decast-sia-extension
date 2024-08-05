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
