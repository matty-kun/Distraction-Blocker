// Local quotes for fallback
const localQuotes = [
    { content: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    // Add more quotes as needed
];

// Function to fetch a random quote from APIs or fallback to local quotes
const fetchRandomQuote = async () => {
    const apis = [
        "https://zenquotes.io/api/random",
        "https://api.quotable.io/random",
    ];
    const api = apis[Math.floor(Math.random() * apis.length)];
    console.log("Fetching quote from:", api);

    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (api.includes("zenquotes.io")) {
            return `${data[0].q} — ${data[0].a}`;
        } else if (api.includes("quotable.io")) {
            return `${data.content} — ${data.author}`;
        }
    } catch (error) {
        console.error("Error fetching quote:", error.message);

        // Select a random quote from the local array as fallback
        const fallbackQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        return `${fallbackQuote.content} — ${fallbackQuote.author}`;
    }
};

// Main logic for site blocking
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
