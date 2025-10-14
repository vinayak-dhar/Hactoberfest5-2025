const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivational"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "motivational"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "success"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        category: "wisdom"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair",
        category: "motivational"
    },
    {
        text: "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
        author: "Roy T. Bennett",
        category: "motivational"
    },
    {
        text: "I learned that courage was not the absence of fear, but the triumph over it.",
        author: "Nelson Mandela",
        category: "wisdom"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "success"
    },
    {
        text: "In this life we cannot do great things. We can only do small things with great love.",
        author: "Mother Teresa",
        category: "life"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon",
        category: "life"
    },
    {
        text: "The purpose of our lives is to be happy.",
        author: "Dalai Lama",
        category: "happiness"
    },
    {
        text: "Get busy living or get busy dying.",
        author: "Stephen King",
        category: "life"
    },
    {
        text: "You only live once, but if you do it right, once is enough.",
        author: "Mae West",
        category: "life"
    },
    {
        text: "Many of life's failures are people who did not realize how close they were to success when they gave up.",
        author: "Thomas Edison",
        category: "success"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "motivational"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
        category: "wisdom"
    },
    {
        text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        author: "Unknown",
        category: "wisdom"
    },
    {
        text: "It's not whether you get knocked down, it's whether you get up.",
        author: "Vince Lombardi",
        category: "motivational"
    },
    {
        text: "People who are crazy enough to think they can change the world, are the ones who do.",
        author: "Rob Siltanen",
        category: "success"
    },
    {
        text: "Failure will never overtake me if my determination to succeed is strong enough.",
        author: "Og Mandino",
        category: "success"
    },
    {
        text: "We may encounter many defeats but we must not be defeated.",
        author: "Maya Angelou",
        category: "motivational"
    },
    {
        text: "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
        author: "Johann Wolfgang Von Goethe",
        category: "wisdom"
    },
    {
        text: "Happiness is not something ready made. It comes from your own actions.",
        author: "Dalai Lama",
        category: "happiness"
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh",
        category: "motivational"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson",
        category: "success"
    },
    {
        text: "Keep your face always toward the sunshine and shadows will fall behind you.",
        author: "Walt Whitman",
        category: "happiness"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
        category: "wisdom"
    },
    {
        text: "An unexamined life is not worth living.",
        author: "Socrates",
        category: "wisdom"
    },
    {
        text: "Your time is limited, so don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "life"
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "motivational"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "success"
    },
    {
        text: "If life were predictable it would cease to be life, and be without flavor.",
        author: "Eleanor Roosevelt",
        category: "life"
    },
    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
        category: "wisdom"
    },
    {
        text: "May you live every day of your life.",
        author: "Jonathan Swift",
        category: "life"
    },
    {
        text: "Life itself is the most wonderful fairy tale.",
        author: "Hans Christian Andersen",
        category: "life"
    },
    {
        text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
        author: "Buddha",
        category: "wisdom"
    },
    {
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
        category: "wisdom"
    },
    {
        text: "Happiness is not by chance, but by choice.",
        author: "Jim Rohn",
        category: "happiness"
    },
    {
        text: "For every minute you are angry you lose sixty seconds of happiness.",
        author: "Ralph Waldo Emerson",
        category: "happiness"
    }
];

let currentQuote = null;
let selectedCategory = 'all';
let favorites = [];
let quotesGenerated = 0;

const quoteText = document.getElementById('quoteText');
const authorText = document.getElementById('authorText');
const categoryBadge = document.getElementById('categoryBadge');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const quotesGeneratedEl = document.getElementById('quotesGenerated');
const favoriteCountEl = document.getElementById('favoriteCount');
const favoritesList = document.getElementById('favoritesList');
const notification = document.getElementById('notification');

function getRandomQuote(category = 'all') {
    let filteredQuotes = quotes;
    
    if (category !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    
    if (filteredQuotes.length === 0) {
        filteredQuotes = quotes;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    return filteredQuotes[randomIndex];
}

function displayQuote(quote) {
    currentQuote = quote;
    quoteText.textContent = quote.text;
    authorText.textContent = `- ${quote.author}`;
    categoryBadge.textContent = quote.category.charAt(0).toUpperCase() + quote.category.slice(1);
    
    quotesGenerated++;
    quotesGeneratedEl.textContent = quotesGenerated;
    
    updateFavoriteButton();
}

function generateNewQuote() {
    const quote = getRandomQuote(selectedCategory);
    displayQuote(quote);
}

function copyQuote() {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Quote copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy quote', 'error');
    });
}

function shareQuote() {
    if (!currentQuote) return;
    
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: text
        }).catch(() => {});
    } else {
        copyQuote();
        showNotification('Quote copied! (Share not supported)', 'info');
    }
}

function toggleFavorite() {
    if (!currentQuote) return;
    
    const index = favorites.findIndex(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        favorites.push({...currentQuote});
        showNotification('Added to favorites!', 'success');
    }
    
    updateFavoriteButton();
    updateFavoritesList();
    favoriteCountEl.textContent = favorites.length;
}

function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const isFavorite = favorites.some(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (isFavorite) {
        favoriteBtn.classList.add('active');
        favoriteBtn.querySelector('.heart').textContent = '♥';
    } else {
        favoriteBtn.classList.remove('active');
        favoriteBtn.querySelector('.heart').textContent = '♡';
    }
}

function updateFavoritesList() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Click the heart to save quotes!</p>';
        return;
    }
    
    favoritesList.innerHTML = favorites.map((quote, index) => `
        <div class="favorite-item">
            <p class="quote-text">"${quote.text}"</p>
            <p class="quote-author">- ${quote.author}</p>
            <button class="remove-btn" onclick="removeFavorite(${index})">×</button>
        </div>
    `).join('');
}

function removeFavorite(index) {
    favorites.splice(index, 1);
    updateFavoritesList();
    updateFavoriteButton();
    favoriteCountEl.textContent = favorites.length;
    showNotification('Removed from favorites', 'info');
}

function setCategory(category) {
    selectedCategory = category;
    
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    generateNewQuote();
}

function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

newQuoteBtn.addEventListener('click', generateNewQuote);
copyBtn.addEventListener('click', copyQuote);
shareBtn.addEventListener('click', shareQuote);
favoriteBtn.addEventListener('click', toggleFavorite);

categoryButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        setCategory(this.dataset.category);
    });
});

generateNewQuote();