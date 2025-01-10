chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
    const currentSite = window.location.hostname.toLowerCase();
    console.log("Blocked sites:", blockedSites);
    console.log("Is blocking enabled:", isBlocked);

    // Ensure that all blocked sites are in lowercase
    const normalizedBlockedSites = blockedSites.map((site) => site.toLowerCase());
    
    // Check if blocking is enabled and if the current site is in the blocked list
    if (isBlocked && normalizedBlockedSites.some(site => currentSite.includes(site))) {
        console.log("Blocking site:", currentSite);

        // Add the 'blocked' class to the body to apply the styles
        document.body.classList.add('blocked');

        // Replace the content with a short delay
        setTimeout(() => {                
            console.log("Replacing content for:", currentSite);
            document.body.innerHTML = `
            <div class="blocked-message">
                <p>Stay Focused!</p>
                <p>Discipline is the bridge between goals and accomplishment.</p>
            </div>
            `;
        }, 100);
    }
});
