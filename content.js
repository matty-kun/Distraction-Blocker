chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
    const currentSite = window.location.hostname.toLowerCase();
    console.log("Blocked sites:", blockedSites);
    console.log("Is blocking enabled:", isBlocked);

    // Ensure that all blocked sites are in lowercase
    const normalizedBlockedSites = blockedSites.map((site) => site.toLowerCase());
    
    // Check if blocking is enabled and if the current site is in the blocked list
    if (isBlocked && normalizedBlockedSites.some(site => currentSite.includes(site))) {
        const observer = new MutationObserver(() => {
            document.body.classList.add('blocked');

            setTimeout(() => {                
                document.body.innerHTML = `
                <div class="blocked-content">
                    <p>Stay Focused!</p>
                    <p>Discipline is the bridge between goals and accomplishment.</p>
                </div>
                `;
            }, 100);
        });

        // Start obsetving the body for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        }); 
        setTimeout(() => observer.disconnect(), 500);
    }
});
