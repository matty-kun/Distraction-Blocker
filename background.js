let isBlocked = false;

// Initialize the extension when installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ isBlocked: false, blockEndTime: null });
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
    } else if (alarm.name === 'playPauseToggled') {
        console.log('Play/Pause button toggled');
        // Add any additional actions for play/pause button here
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Play/Pause Toggled',
            message: 'The play/pause button was toggled.'
        });
    } else if (alarm.name === 'quoteAdded') {
        console.log('Quote added');
        // Add any additional actions for adding a quote here
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Quote Added',
            message: 'A new quote was added.'
        });
    } else if (alarm.name === 'timerFinished') {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Timer Completed',
            message: 'The timer has finished!'
        });
    }
});

// Check the timer periodically
setInterval(() => {
    chrome.storage.sync.get(["blockEndTime"], ({ blockEndTime }) => {
        if (blockEndTime && Date.now() >= blockEndTime) {
            chrome.storage.sync.set({ isBlocked: false, blockEndTime: null }, () => {
                console.log("Blocking period ended");
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: 'Blocking Period Ended',
                    message: 'The blocking period has ended.'
                });
            });
        }
    });
}, 60000); // Check every minute