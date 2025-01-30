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

// Function to fetch a random quote from local quotes
const fetchRandomQuote = () => {
    const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    return `${randomQuote.content} — ${randomQuote.author}`;
};

// Main logic for site blocking
chrome.storage.sync.get(["isBlocked"], ({ isBlocked }) => {
    const currentSite = window.location.hostname.toLowerCase();

    if (isBlocked) {
        document.body.innerHTML = `
            <div class="blocked-message" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; background-color: #000; color: #fff;">
                <p style="font-size: 2em; margin-bottom: 20px;">Stay Focused!</p>
                <p id="quote" style="font-size: 1.5em; margin-bottom: 20px;">${fetchRandomQuote()}</p>
            </div>
        `;
    }
});