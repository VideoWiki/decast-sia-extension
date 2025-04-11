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
                      sendResponse(null);
                    }
                  }
                );
              }
            );
          } else {
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
    const cachedData = await chrome.storage.local.get([
      "cachedGasPrices",
      "lastFetched",
    ]);
    const lastFetched = cachedData.lastFetched || 0;
    const now = Date.now();

    if (now - lastFetched > 10 * 60 * 1000) {
      const url =
        "https://api.blocknative.com/gasprices/blockprices?confidenceLevels=99&confidenceLevels=90&confidenceLevels=80&confidenceLevels=60";
      const response = await fetch(url);
      const data = await response.json();

      if (data?.blockPrices?.[0]?.estimatedPrices) {
        const blockPrices = data.blockPrices[0].estimatedPrices;
        const normalPrice = blockPrices.find(
          (price) => price.confidence === 90
        );

        if (normalPrice) {
          const gasPrice = normalPrice.price;
          updateBadge(gasPrice);

          await chrome.storage.local.set({
            gasPrices: blockPrices,
            cachedGasPrices: blockPrices,
            lastFetched: now,
          });

          chrome.runtime.sendMessage({ action: "updateGasPrices" });
        }
      } else {
        console.error("No gas price data available");
      }
    } else {
      if (cachedData.cachedGasPrices && cachedData.cachedGasPrices.length > 0) {
        const cachedPrice = cachedData.cachedGasPrices.find(
          (price) => price.confidence === 90
        );
        if (cachedPrice) {
          updateBadge(cachedPrice.price);
        }
      }
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
