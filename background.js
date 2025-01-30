// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isBlocked: false });
});

// Listen for messages to start blocking
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "toggleBlocking") {
        chrome.storage.sync.set({ isBlocked: message.isBlocked }, () => {
            if (message.isBlocked) {
                // Create a notification when the site is successfully blocked
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Site Blocked",
                    message: "The site has been successfully blocked."
                });
            }
        });
    }
});