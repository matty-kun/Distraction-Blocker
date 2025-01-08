chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
    const currentSite = window.location.hostname.toLowerCase();
    console.log("Blocked sites:", blockedSites);
    console.log("Is blocking enabled:", isBlocked);

    // Ensure that all blocked sites are in lowercase
    const normalizedBlockedSites = blockedSites.map((site) => site.toLowerCase());
    
    // Check if blocking is enabled and if the current site is in the blocked list
    if (isBlocked && normalizedBlockedSites.some(site => currentSite.includes(site))) {
        const observer = new MutationObserver(() => {
            document.body.style.backgroundColor = "black";
            document.body.style.color = "white";
            document.body.style.margin = "0";
            document.body.style.height = "100vh";
            document.body.style.display = "flex";
            document.body.style.flexDirection = "column";
            document.body.style.justifyContent = "center";
            document.body.style.alignItems = "center";
            setTimeout(() => {                

                document.body.innerHTML = `
                <div style="text-align: center; font-size: 24px; margin-top: 20%">
                    <p style="font-size: 24px; font-weight: bold; color: white" >Stay Focused!</p>
                    <p style="font-size: 18px; color: white">Discipline is the bridge between goals and accomplishment.</p>
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
