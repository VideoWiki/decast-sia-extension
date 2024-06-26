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
