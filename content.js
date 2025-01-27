// Local quotes for fallback
const localQuotes = [
    { content: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
    { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { content: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "Get busy living or get busy dying.", author: "Stephen King" },
    { content: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
    // Add more quotes as needed
];

// Function to fetch a random quote from local and custom quotes
const fetchRandomQuote = async () => {
    const customQuotes = await new Promise(resolve => {
        chrome.storage.sync.get(["customQuotes"], ({ customQuotes = [] }) => {
            resolve(customQuotes);
        });
    });
    const allQuotes = [...localQuotes, ...customQuotes];
    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    return `${randomQuote.content} — ${randomQuote.author}`;
};

// Main logic for site blocking
chrome.storage.sync.get(["blockedSites", "isBlocked", "blockEndTime"], ({ blockedSites = [], isBlocked, blockEndTime }) => {
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
            }, 10);
        });
    }
});