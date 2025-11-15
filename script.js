/* MOBILE MENU */
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("showNav");
});

/* Scroll log (optional)
document.addEventListener("scroll", () => {
    console.log("Scrolling...");
});
*/
