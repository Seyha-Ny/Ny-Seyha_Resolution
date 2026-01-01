// Motivational quotes
const quotes = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" }
];

// DOM elements
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const quoteContainer = document.getElementById('quoteContainer');
const quoteElement = quoteContainer.querySelector('.quote');
const authorElement = quoteContainer.querySelector('.quote-author');

// Show random quote
function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        quoteElement.textContent = `"${randomQuote.text}"`;
        authorElement.textContent = `— ${randomQuote.author}`;
        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 0.8;
    }, 300);
}

// Create star element for animation
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '⭐';
    star.style.position = 'absolute';
    star.style.fontSize = Math.random() * 20 + 10 + 'px';
    star.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
    star.style.left = Math.random() * 100 + 'px';
    star.style.opacity = '0';
    star.style.transition = 'opacity 0.3s';
    
    // Fade in
    setTimeout(() => {
        star.style.opacity = '1';
    }, 10);
    
    return star;
}

// Create multiple stars around an element
function createStarsAroundElement(element, count = 15) {
    const rect = element.getBoundingClientRect();
    const container = document.createElement('div');
    container.className = 'stars-container';
    container.style.position = 'absolute';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'visible';
    
    // Position the container relative to the viewport
    const containerRect = element.parentElement.getBoundingClientRect();
    container.style.position = 'absolute';
    container.style.top = containerRect.top + 'px';
    container.style.left = containerRect.left + 'px';
    container.style.width = containerRect.width + 'px';
    container.style.height = containerRect.height + 'px';
    
    document.body.appendChild(container);
    
    // Create stars
    for (let i = 0; i < count; i++) {
        const star = createStar();
        container.appendChild(star);
    }
    
    // Remove container after animation
    setTimeout(() => {
        container.style.opacity = '0';
        setTimeout(() => {
            container.remove();
        }, 1000);
    }, 2000);
}

// Create confetti effect
function createConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.6 },
        spread: 80,
        ticks: 100,
        gravity: 1.5,
        decay: 0.92,
        startVelocity: 25,
        colors: ['#FFD700', '#FF69B4', '#00FFFF', '#FFA500', '#FF1493', '#00FF7F']
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}

// Update progress function
function updateProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    const progress = Math.round((checked.length / checkboxes.length) * 100);

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}% Complete`;

    // Change progress bar color based on completion
    if (progress < 30) {
        progressBar.style.background = '#EF4444';
    } else if (progress < 70) {
        progressBar.style.background = '#F59E0B';
    } else {
        progressBar.style.background = '#10B981';
    }
    
    // Special celebration for 100% completion
    if (progress === 100) {
        setTimeout(() => {
            // Big celebration for completing all resolutions
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createConfetti(), i * 1500);
            }
        }, 500);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    // Show initial quote
    showRandomQuote();

    // Change quote every 10 seconds
    setInterval(showRandomQuote, 10000);

    // Load saved states and set up event listeners
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        // Add animation delay
        checkbox.parentElement.style.animationDelay = `${index * 0.05}s`;

        // Load saved state
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
            checkbox.parentElement.classList.add('completed');
        }

        // Add event listener for changes
        checkbox.addEventListener('change', function () {
            // Save state
            const wasChecked = localStorage.getItem(checkbox.id) === 'true';
            localStorage.setItem(checkbox.id, checkbox.checked);

            // Toggle completed class
            if (checkbox.checked) {
                checkbox.parentElement.classList.add('completed');
                
                // Only trigger effects if this is a new completion (wasn't already checked)
                if (!wasChecked) {
                    // Add celebration class for animation
                    checkbox.parentElement.classList.add('celebrating');
                    
                    // Create stars around the completed item
                    createStarsAroundElement(checkbox.parentElement);
                    
                    // Trigger confetti
                    createConfetti();
                    
                    // Remove celebration class after animation
                    setTimeout(() => {
                        checkbox.parentElement.classList.remove('celebrating');
                    }, 2000);
                }
            } else {
                checkbox.parentElement.classList.remove('completed', 'celebrating');
            }

            // Update progress
            updateProgress();
        });
    });

    // Initial progress update
    updateProgress();
});
