let isBlocked = false;

chrome.alarms.onAlarm.addListener(() => {
    isBlocked = !isBlocked;
    chrome.storage.sync.set({ isBlocked });
})