//HAM BUTTON
const hamButton = document.querySelector("#hamButton");
const navMenu = document.querySelector("#animateme");

hamButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamButton.classList.toggle("active");
});
window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#animateme').classList.remove('hidden');
});