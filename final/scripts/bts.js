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
    displayLogoCards(globalMembers, isDarkMode);
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

//CARDS
  //Add JSON
const url = "data/bts.json";
const cards = document.querySelector("#member-cards");
let globalMembers = [];
async function getMembersData() {
    const response = await fetch(url);
    const data = await response.json();
    globalMembers = data.members;
    displayLogoCards(globalMembers, isDarkMode);
}

const displayLogoCards = (members, isDark) => {
    cards.innerHTML = "";
    members.forEach(member => {
        const card  = document.createElement("section");
        card.classList.add("band-card");

        const name  = document.createElement("h3");
        name.textContent = member.name;

        const birth = document.createElement("p");
        birth.innerHTML = `<strong>Birth:</strong> ${member.birth}`;

        const position = document.createElement("p");
        position.innerHTML = `<strong>Position:</strong> ${member.position}`;

        const picture = document.createElement("picture");

        const largeImg = document.createElement('source');
        largeImg.setAttribute('media', '(min-width: 1020px)');
        largeImg.setAttribute('srcset', isDark ? member.imgUrlLargeD : member.imgUrlLargeL);
        largeImg.setAttribute('width', '800');
        largeImg.setAttribute('height', '800');

        const mediumImg = document.createElement('source');
        mediumImg.setAttribute('media', '(min-width: 600px)');
        mediumImg.setAttribute('srcset', isDark ? member.imgUrlMediumD : member.imgUrlMediumL);
        mediumImg.setAttribute('width', '500');
        mediumImg.setAttribute('height', '500');

        const smallImg = document.createElement('img');
        smallImg.setAttribute('src', isDark ? member.imgUrlD : member.imgUrlL);
        smallImg.setAttribute('alt', `Image of ${member.name}`);
        smallImg.setAttribute('loading', 'lazy');
        smallImg.setAttribute('width', '300');
        smallImg.setAttribute('height', '300');

        picture.appendChild(largeImg);
        picture.appendChild(mediumImg);
        picture.appendChild(smallImg);

        card.appendChild(picture);
        card.appendChild(name);
        card.appendChild(birth);
        card.appendChild(position);

        cards.appendChild(card);
    });
}
getMembersData() ;   
