let isBlocked = false;

// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Distraction Blocker extension installed.");
    isBlocked = false; // Initial state
    chrome.storage.sync.set({ isBlocked }); // Store initial state
    chrome.alarms.create('toggleBlock', { periodInMinutes: 1 }); // Alarm setup
});

// Listen for alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'toggleBlock') {
        isBlocked = !isBlocked; // Toggle blocking state
        chrome.storage.sync.set({ isBlocked }); // Update storage
        console.log(`Blocking status toggled: ${isBlocked}`);
    }
});
