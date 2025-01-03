// Refers the textarea and button
const blockedSitesInput = document.getElementById("block-sites");
const saveButton = document.getElementById("save-settings");


// Load the blocked sites when the popup opens
chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
    blockedSitesInput.value = blockedSites ? blockedSites.join("\n") : ""; // Show blocked sites as a list
}) ;

// Save the blocked sites when the button is clicked
saveButton.addEventListener("click", () => {
    const sites = blockedSitesInput.value
        .split("\n") // Split by new lines
        .map(site => site.trim()) // Remove extra spaces
        .filter(site => site); // Remove empty lines

    chrome.storage.sync.set({ blockedSites: sites }, () => {
        alert("Blocked sites updated");
    });
});