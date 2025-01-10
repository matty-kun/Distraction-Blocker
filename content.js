chrome.storage.sync.get(["blockedSites", "isBlocked"], ({ blockedSites = [], isBlocked }) => {
    const currentSite = window.location.hostname.toLowerCase();
    console.log("Blocked sites:", blockedSites);
    console.log("Is blocking enabled:", isBlocked);

    // Ensure that all blocked sites are in lowercase
    const normalizedBlockedSites = blockedSites.map((site) => site.toLowerCase());
    
    // Function to fetch a random quote from the Quotable API
    const fetchRandomQuote = async () => {
        try {
            const response = await fetch("https://api.quotable.io/random");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return `${data.content} — ${data.author}`;
        }  catch (error) { 
            console.error("Error fetching quote:", error);
            return "Discipline is the bridge between goals and accomplishment. —Jim Rohn";
        }
    };

    // Check if blocking is enabled and if the current site is in the blocked list
    if (isBlocked && normalizedBlockedSites.some(site => currentSite.includes(site))) {
        console.log("Blocking site:", currentSite);

        // Add the 'blocked' class to the body to apply the styles
        document.body.classList.add('blocked');

        // Fetch a random quote and display it
        fetchRandomQuote().then(randomQuote => {
            // Replace the content with a short delay
            setTimeout(() => {                
                console.log("Replacing content for:", currentSite);
                document.body.innerHTML = `
                <div class="blocked-message">
                    <p>Stay Focused!</p>
                    <p>${randomQuote}</p>
                </div>
                `;
            }, 100);
        });
    }
});
