chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites, isBlocked }) => {
    const currentSite = window.location.hostname;

    // Check if blocking is enabled and if the current site is in the blocked list
    if (isBlocked && blockedSites.includes(currentSite)) {
        document.body.innerHTML = `
        <div style="text-align: center; font-size: 24px; margin-top: 20%">
            <p>Stay Focused!</p>
            <p>"Discipline is the bridge between goals and accomplishment."</p>
        </div>
        `;
    }
});
