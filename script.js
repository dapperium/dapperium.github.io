// ------------------ THEME SYSTEM (DARK / LIGHT) ------------------
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");

    // default theme load
    let currentTheme = localStorage.getItem("theme") || "dark";
    body.setAttribute("data-theme", currentTheme);

    // set correct icon
    updateThemeIcon(currentTheme);

    // toggle button click
    themeToggle.addEventListener("click", () => {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        body.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
        updateThemeIcon(currentTheme);
    });
});
<div class="mobile-toggle">☰</div>


// change icon
function updateThemeIcon(theme) {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.innerHTML = theme === "dark"
        ? "🌞"   // sun icon
        : "🌙";  // moon icon
}



// ------------------ LIKE SYSTEM ------------------
let likes = JSON.parse(localStorage.getItem("likes")) || {};

function handleLike(id) {
    if (!likes[id]) likes[id] = 0;
    likes[id]++;

    document.getElementById("count-" + id).innerText = likes[id];
    localStorage.setItem("likes", JSON.stringify(likes));
}

// ------------------ COMMENT SYSTEM ------------------
let comments = JSON.parse(localStorage.getItem("comments")) || {};

function handleComment(event, id) {
    if (event.key === "Enter") {
        let input = event.target;
        let text = input.value.trim();

        if (text.length > 0) {
            if (!comments[id]) comments[id] = [];
            comments[id].push(text);

            updateComments(id);
            localStorage.setItem("comments", JSON.stringify(comments));
            input.value = "";
        }
    }
}

function updateComments(id) {
    let list = document.getElementById("list-" + id);
    list.innerHTML = "";

    if (comments[id]) {
        comments[id].forEach((c) => {
            let p = document.createElement("p");
            p.className = "comment";
            p.innerText = c;
            list.appendChild(p);
        });
    }
}

// Load saved comments
window.onload = () => {
    Object.keys(comments).forEach((id) => updateComments(id));
};

// ------------------ SHARE SYSTEM ------------------
function sharePost(id) {
    const url = window.location.href + "#" + id;
    navigator.share
        ? navigator.share({ title: "Dapperium Post", url })
        : alert("Sharing not supported on this device");
}

// ------------------ SLIDER: DOT CLICK + SWIPE + ACTIVE DOT ------------------
function setPostSlide(id, index) {
    const slider = document.querySelector(`.insta-slider[data-id="${id}"]`);
    if (!slider) return;

    const slides = slider.querySelectorAll('.insta-slide');
    const dots = slider.parentElement.querySelectorAll('.insta-dot');

    slides.forEach((s, i) => {
        if (i === index) {
            s.classList.add("active");
        } else {
            s.classList.remove("active");
        }
    });

    dots.forEach((d, i) => d.classList.toggle("active", i === index));
}


// ------------------ SWIPE FEATURE ------------------
let startX = 0;

document.querySelectorAll(".insta-slider").forEach((slider) => {
    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        const postId = slider.getAttribute("data-id");
        const slides = slider.querySelectorAll(".insta-slide");
        let activeIndex = [...slides].findIndex((s) =>
            s.classList.contains("active")
        );

        if (diff > 50) activeIndex++; // swipe left
        if (diff < -50) activeIndex--; // swipe right

        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= slides.length) activeIndex = slides.length - 1;

        setPostSlide(postId, activeIndex);
    });
});
// ------------------ TRACKPAD SWIPE (SLOW + SMOOTH) ------------------
document.querySelectorAll(".insta-slider").forEach((slider) => {

    let wheelBuffer = 0;            // movement store karne ke liye buffer
    const threshold = 120;          // jitna scroll hone par slide change hogi (higher = slower)

    slider.addEventListener("wheel", (e) => {
        wheelBuffer += e.deltaY || e.deltaX;

        const postId = slider.getAttribute("data-id");
        const slides = slider.querySelectorAll(".insta-slide");
        let activeIndex = [...slides].findIndex(s => s.classList.contains("active"));

        // Scroll right / next slide
        if (wheelBuffer > threshold) {
            activeIndex++;
            wheelBuffer = 0; // reset buffer
        }

        // Scroll left / previous slide
        if (wheelBuffer < -threshold) {
            activeIndex--;
            wheelBuffer = 0; // reset buffer
        }

        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= slides.length) activeIndex = slides.length - 1;

        setPostSlide(postId, activeIndex);
    });
});

