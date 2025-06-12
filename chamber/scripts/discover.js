// Get the current date dynamically
const year = document.querySelector("#currentyear");
const today = new Date();
year.textContent = `© ${today.getFullYear()} American Chamber of Commerce`;
const full = document.querySelector("#lastModified");

if (full) {
    full.innerHTML = `Last Modification: <span class="highlight">${document.lastModified}</span>`;
}
 //Hamburguer menu
const hamburgerElement = document.querySelector('#myButton');
//Without nav id
//const navElement = document.querySelector('.menuLinks');
const navElement = document.querySelector('#animateme');

hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');

});
// Visit of the user
const welcomeMessageParagraph = document.querySelector("#welcome-msg");

const msToDays = 86400000;
const todayUser = Date.now();

console.log(todayUser);

if (localStorage.getItem("lastVisitMS") !== null) {
    lastVisitMS = parseInt(localStorage.getItem("lastVisitMS"));

    let elapsedDays = (todayUser - lastVisitMS) / msToDays;

    console.log(elapsedDays);

    if (elapsedDays < 1) {
        welcomeMessageParagraph.textContent = "Back so soon! Awesome!";
    } else {
        elapsedDays = Math.round(elapsedDays);

        if (elapsedDays == 1) {
            welcomeMessageParagraph.textContent = "You last visited 1 day ago.";
        } else {
            welcomeMessageParagraph.textContent = `You last visited ${elapsedDays} days ago.`;
        }
    }
} else {
    welcomeMessageParagraph.textContent = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("lastVisitMS", todayUser);

//Add JSON
const url = "data/areas.json";
const cards = document.querySelector("#discover-content");
async function getAreasData() {
    const response = await fetch(url);
    const data = await response.json();
    displayAreaCards(data.areas);

}

// Función para mostrar en vista de tarjetas
const displayAreaCards = (areas) => {
    areas.forEach((area) => {
        const card = document.createElement("section");
        card.className = "discover-card";
        card.setAttribute("tabindex", "0");

        const title = document.createElement("h2");
        title.className = "discover-card-name";
        title.textContent = area.name;
        title.setAttribute("tabindex", "0");

        const discoverFigure = document.createElement("figure");

        const discoverImage = document.createElement("img");
        discoverImage.className = "animation";
        discoverImage.setAttribute("src", area.imageUrl);
        discoverImage.setAttribute("alt", `${area.name} Image`);
        discoverImage.setAttribute("width", "300");
        discoverImage.setAttribute("height", "200");
        discoverImage.setAttribute("loading", "lazy");
        discoverImage.setAttribute("tabindex", "0");

        discoverFigure.appendChild(discoverImage);

        const description = document.createElement("p");
        description.textContent = area.description;
        description.setAttribute("tabindex", "0");

        const address = document.createElement("address");
        address.setAttribute("tabindex", "0")
        address.textContent = area.address;

        const learnMoreButton = document.createElement("button")

        learnMoreButton.addEventListener('click', () => {
            window.open(area.learnMoreUrl, "_blank");
        });
        learnMoreButton.setAttribute("tabindex", "0");
        learnMoreButton.textContent = "Learn More"

        card.appendChild(title);
        card.appendChild(discoverFigure);
        card.appendChild(description);
        card.appendChild(address);
        card.appendChild(learnMoreButton);

        cards.appendChild(card);
    });
}

getAreasData();