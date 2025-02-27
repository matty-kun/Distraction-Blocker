// Refers the textarea and button
const blockedSitesInput = document.getElementById("block-sites");
const saveButton = document.getElementById("save-settings");
const blockToggle = document.getElementById("block-toggle");

// Press Enter to save settings
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        document.getElementById("save-settings").click();
    }
});

// Load saved settings
chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
    blockedSitesInput.value = blockedSites.join("\n"); // Load sites as a list
    blockToggle.checked = isBlocked; // Set the toggle state
});


// Save the blocked sites when the button is clicked
saveButton.addEventListener("click", () => {
    const sites = blockedSitesInput.value
        .split("\n") // Split by new lines
        .map(site => site.trim()) // Remove extra spaces
        .filter(site => site); // Remove empty lines

    chrome.storage.sync.set({ blockedSites: sites, isBlocked: blockToggle.checked }, () => {
        alert("Settings saved successfully!");
    });
});