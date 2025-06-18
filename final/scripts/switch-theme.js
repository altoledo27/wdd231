//Starts always dark
let isDarkMode = true;
const toggleBtn = document.querySelector('.toggle-btn');
const darkMode = document.getElementById('darkMode');
const lightMode = document.getElementById('lightMode');
const cssRef = document.querySelector("#theme");
const themeSwitchButton = document.querySelector("#themeswitch");

let currentTheme = "dark-mode.css";

if (localStorage.getItem("theme") !== null) {
    let storedTheme = localStorage.getItem("theme");

    if (storedTheme != currentTheme)
    {
        currentTheme = storedTheme;
        setTheme(currentTheme);
    }
}

themeSwitchButton.addEventListener('click', () => {
    if (currentTheme == "dark-mode.css") {
        currentTheme = "light-mode.css";
        isDarkMode= false; 
    } else {
        currentTheme = "dark-mode.css";
        isDarkMode= true;      
    }

    localStorage.setItem("theme", currentTheme);

    setTheme(currentTheme);
    toggleMode();
});

function setTheme(themeName) {
    cssRef.setAttribute('href', `styles/${themeName}`);
 
}
function toggleMode() {

    if (isDarkMode) {
        toggleBtn.innerHTML = '🌙';
    } else {
        toggleBtn.innerHTML = '☀️';
    }
}



//Get day
const todays_date = new Date();
const last_modified_date = new Date(document.lastModified);

const last_modified_month = last_modified_date.getMonth() + 1;

const footer_year_span = document.querySelector("#currentyear");
const last_modified_date_paragraph = document.querySelector("#lastModified");

let modified_date_str = last_modified_month.toLocaleString('en-US',
    { minimumIntegerDigits: 2, useGrouping: false }) + "/" + last_modified_date.getDate().toLocaleString('en-US',
        { minimumIntegerDigits: 2, useGrouping: false }) + "/" + last_modified_date.getFullYear() + " " + last_modified_date.getHours().toLocaleString('en-US',
            { minimumIntegerDigits: 2, useGrouping: false }) + ":" + last_modified_date.getMinutes().toLocaleString('en-US',
                { minimumIntegerDigits: 2, useGrouping: false }) + ":" + last_modified_date.getSeconds().toLocaleString('en-US',
                    { minimumIntegerDigits: 2, useGrouping: false })

footer_year_span.innerHTML = todays_date.getFullYear();
last_modified_date_paragraph.innerHTML = `<span class="highlight">Last Modification: ${modified_date_str}</span>`;

