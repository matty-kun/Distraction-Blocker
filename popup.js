// Refers the textarea and button
const blockedSitesInput = document.getElementById("block-sites");
const blockToggle = document.getElementById("block-toggle");
const saveSettingsButton = document.getElementById("save-settings");
const customQuoteContentInput = document.getElementById("custom-quote-content");
const customQuoteAuthorInput = document.getElementById("custom-quote-author");
const addQuoteButton = document.getElementById("add-quote");
const blockTimerInput = document.getElementById("block-timer");
const setTimerButton = document.getElementById("set-timer");

// Load settings from storage
chrome.storage.sync.get(["blockedSites", "isBlocked", "customQuotes", "blockEndTime"], ({ blockedSites = [], isBlocked, customQuotes = [], blockEndTime }) => {
    blockedSitesInput.value = blockedSites.join("\n");
    blockToggle.checked = isBlocked;
    customQuotes.forEach(quote => {
        console.log(`Custom Quote: ${quote.content} — ${quote.author}`);
    });
    if (blockEndTime) {
        const remainingTime = Math.max(0, Math.floor((blockEndTime - Date.now()) / 60000));
        blockTimerInput.value = remainingTime;
    }
});

// Save settings to storage
saveSettingsButton.addEventListener("click", () => {
    const blockedSites = blockedSitesInput.value.split("\n").map(site => site.trim()).filter(site => site);
    const isBlocked = blockToggle.checked;
    chrome.storage.sync.set({ blockedSites, isBlocked }, () => {
        console.log("Settings saved");
    });
});

// Add custom quote to storage
addQuoteButton.addEventListener("click", () => {
    const content = customQuoteContentInput.value.trim();
    const author = customQuoteAuthorInput.value.trim();
    if (content && author) {
        chrome.storage.sync.get(["customQuotes"], ({ customQuotes = [] }) => {
            customQuotes.push({ content, author });
            chrome.storage.sync.set({ customQuotes }, () => {
                console.log("Custom quote added");
                customQuoteContentInput.value = "";
                customQuoteAuthorInput.value = "";
            });
        });
    }
});

// Set timer for blocking
setTimerButton.addEventListener("click", () => {
    const minutes = parseInt(blockTimerInput.value, 10);
    if (!isNaN(minutes) && minutes > 0) {
        const blockEndTime = Date.now() + minutes * 60000;
        chrome.storage.sync.set({ blockEndTime }, () => {
            console.log(`Blocking set for ${minutes} minutes`);
        });
    }
});