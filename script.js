// --- 1. THEME SYSTEM ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark for premium feel

// Apply saved theme on load
body.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' ? 
        '<img src="icons/sun.png" width="20">' : 
        '<img src="icons/moon.png" width="20">';
}

// --- 2. MOBILE MENU ---
function toggleMenu() {
    const nav = document.querySelector('.nav-menu');
    nav.classList.toggle('active');
}

// --- 3. LIKE & COMMENT SYSTEM ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counters
    const mediaItems = document.querySelectorAll('.media-item');
    mediaItems.forEach(item => {
        const id = item.getAttribute('data-id');
        if(!id) return;
        
        // Load Likes
        const likes = localStorage.getItem(`dapper_likes_${id}`) || 0;
        const countSpan = document.getElementById(`count-${id}`);
        if(countSpan) countSpan.innerText = likes;

        // Load Comments
        const comments = JSON.parse(localStorage.getItem(`dapper_comments_${id}`) || '[]');
        renderComments(id, comments);
    });
});

function handleLike(id) {
    let likes = parseInt(localStorage.getItem(`dapper_likes_${id}`) || 0);
    likes++;
    localStorage.setItem(`dapper_likes_${id}`, likes);
    
    const btn = document.querySelector(`[onclick="handleLike('${id}')"]`);
    btn.classList.add('liked'); // Add red color
    document.getElementById(`count-${id}`).innerText = likes;
}

function handleComment(event, id) {
    if(event.key === 'Enter') {
        const input = event.target;
        const text = input.value.trim();
        if(text) {
            const comments = JSON.parse(localStorage.getItem(`dapper_comments_${id}`) || '[]');
            comments.push(text);
            localStorage.setItem(`dapper_comments_${id}`, JSON.stringify(comments));
            
            renderComments(id, comments);
            input.value = ''; // Clear input
        }
    }
}

function renderComments(id, commentsArray) {
    const list = document.getElementById(`list-${id}`);
    if(!list) return;
    list.innerHTML = commentsArray.map(c => 
        `<div class="comment-single"><b>User:</b> ${c}</div>`
    ).join('');
}