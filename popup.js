// Refers the textarea and button
const blockedSitesInput = document.getElementById("block-sites");
const blockToggle = document.getElementById("block-toggle");
const saveSettingsButton = document.getElementById("save-settings");
const customQuoteContentInput = document.getElementById("custom-quote-content");
const customQuoteAuthorInput = document.getElementById("custom-quote-author");
const addQuoteButton = document.getElementById("add-quote");
const blockTimerHoursInput = document.getElementById("block-timer-hours");
const blockTimerMinutesInput = document.getElementById("block-timer-minutes");
const blockTimerSecondsInput = document.getElementById("block-timer-seconds");
const playButton = document.getElementById("play-timer");
const timerProgress = document.querySelector(".timer-progress");

let isPlaying = false;
let animationFrame;
let startTime;
let remainingTime = 0;
let totalDuration = 0;

// Load settings from storage
chrome.storage.sync.get(["blockedSites", "isBlocked", "customQuotes", "blockEndTime", "isPlaying"], ({ blockedSites = [], isBlocked, customQuotes = [], blockEndTime, isPlaying = false }) => {
    blockedSitesInput.value = blockedSites.join("\n");
    blockToggle.checked = isBlocked;
    customQuotes.forEach(quote => {
        console.log(`Custom Quote: ${quote.content} — ${quote.author}`);
    });
    if (blockEndTime) {
        const remainingTime = Math.max(0, blockEndTime - Date.now());
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        blockTimerHoursInput.value = hours;
        blockTimerMinutesInput.value = minutes;
        blockTimerSecondsInput.value = seconds;
        startTimerAnimation(remainingTime);
    }
    // Restore play button state
    if (isPlaying) {
        playButton.classList.add("btn-success");
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playButton.classList.remove("btn-success");
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Save settings to storage
saveSettingsButton.addEventListener("click", () => {
    const blockedSites = blockedSitesInput.value.split("\n").map(site => site.trim()).filter(site => site);
    const isBlocked = blockToggle.checked;
    chrome.storage.sync.set({ blockedSites, isBlocked }, () => {
        console.log("Settings saved");
    });
});

// Add custom quote to storage
addQuoteButton.addEventListener("click", () => {
    const content = customQuoteContentInput.value.trim();
    const author = customQuoteAuthorInput.value.trim();
    if (content && author) {
        chrome.storage.sync.get(["customQuotes"], ({ customQuotes = [] }) => {
            customQuotes.push({ content, author });
            chrome.storage.sync.set({ customQuotes }, () => {
                console.log("Custom quote added");
                customQuoteContentInput.value = "";
                customQuoteAuthorInput.value = "";
                // Create an alarm for adding a quote
                chrome.alarms.get('quoteAdded', (alarm) => {
                    if (!alarm) {
                        chrome.alarms.create('quoteAdded', { when: Date.now() });
                    }
                });
            });
        });
    }
});

// Toggle play/pause button and set timer
playButton.addEventListener('click', () => {
    if (!isPlaying) {
        const hours = parseInt(blockTimerHoursInput.value) || 0;
        const minutes = parseInt(blockTimerMinutesInput.value) || 0;
        const seconds = parseInt(blockTimerSecondsInput.value) || 0;
        totalDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
        
        if (totalDuration === 0) {
            alert("Please set a valid timer duration.");
            return;
        }
        
        startTime = Date.now();
        remainingTime = totalDuration;
        animate();
        isPlaying = true;
    } else {
        cancelAnimationFrame(animationFrame);
        remainingTime = totalDuration - (Date.now() - startTime);
        isPlaying = false;
    }
    
    playButton.innerHTML = isPlaying 
        ? '<i class="fas fa-pause"></i>'
        : '<i class="fas fa-play"></i>';
    playButton.classList.toggle("btn-success", isPlaying);
    chrome.storage.sync.set({ isPlaying, blockEndTime: isPlaying ? Date.now() + remainingTime : null });
});

function animate() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / totalDuration;
    
    if (progress < 1) {
        timerProgress.style.strokeDashoffset = 175 * (1 - progress);
        animationFrame = requestAnimationFrame(animate);
    } else {
        // Timer complete
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playButton.classList.remove("btn-success");
        alert("Time's up!");
    }
}

// Function to start the timer animation
function startTimerAnimation(duration) {
    timerProgress.style.animation = 'none';
    timerProgress.offsetHeight; // Trigger reflow
    timerProgress.style.animation = `timer-animation ${duration}ms linear forwards`;
}