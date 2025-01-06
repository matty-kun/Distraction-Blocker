let isBlocked = false;

// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Distraction Blocker extension installed.");
    // Set initial state and store it
    isBlocked = false;
    chrome.storage.sync.set({ isBlocked });
    // Create an alarm to toggle the blocking state every minute
    chrome.alarms.create('toggleBlock', { periodInMinutes: 1 });
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'toggleBlock') {
        // Toggle blocking state
        isBlocked = !isBlocked;
        // Update storage with the new state
        chrome.storage.sync.set({ isBlocked });
        console.log(`Blocking status toggled: ${isBlocked}`);
    }
});