document.addEventListener("DOMContentLoaded", () => {
    const blockedSitesInput = document.getElementById("block-sites");
    const blockToggle = document.getElementById("block-toggle");
    const saveSettingsButton = document.getElementById("save-settings");

    // Load settings from storage
    chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
        blockedSitesInput.value = blockedSites.join(", ");
        blockToggle.checked = isBlocked;
    });

    // Save settings to storage
    const saveSettings = () => {
        const blockedSites = blockedSitesInput.value.split(/[\s,]+/).map(site => site.trim()).filter(site => site);
        const isBlocked = blockToggle.checked;
        chrome.storage.sync.set({ blockedSites, isBlocked }, () => {
            console.log("Settings saved");
            if (isBlocked) {
                chrome.runtime.sendMessage({ type: "toggleBlocking", isBlocked: true });
            } else {
                chrome.runtime.sendMessage({ type: "toggleBlocking", isBlocked: false });
            }
        });
    };

    saveSettingsButton.addEventListener("click", saveSettings);

    // Add event listener for Enter key
    blockedSitesInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveSettings();
        }
    });

    blockToggle.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveSettings();
        }
    });
});