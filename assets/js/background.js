// Listening for messages from the popup script
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
                // Injecting content script if not already injected
                chrome.scripting.executeScript({
                    target: { tabId: decastTab.id },
                    files: ['contentScript.js']
                }, () => {
                    // Sending a message to the content script to retrieve localStorage data
                    chrome.tabs.sendMessage(decastTab.id, { action: 'getLocalStorage' }, function(response) {
                        // Sending the localStorage data back to the popup
                        sendResponse(response);
                    });
                });
            } else {
                console.error('decast.live tab is not open.');
                sendResponse(null);
            }
        });

        // Returning true to indicate that sendResponse will be called asynchronously
        return true;
    }
});

// Listening for external messages from the content script
chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    if (message.action === 'getLocalStorage') {
        // Retrieving data from localStorage
        const accessToken = localStorage.getItem('accessToken');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        // Sending the data back to the background script
        sendResponse({ accessToken, userInfo });
    }
});
