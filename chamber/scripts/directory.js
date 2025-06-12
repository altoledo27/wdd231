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


//Add JSON
const url = "data/members.json";
const cards = document.querySelector("#cards");
const cardViewButton = document.querySelector("#card-button");
const listViewButton = document.querySelector("#list-button");

// Listeners para botones de vista
cardViewButton.addEventListener('click', () => {
    getMembersData("card");
});

listViewButton.addEventListener('click', () => {
    getMembersData("list");
});

// Función principal para obtener y mostrar los datos
async function getMembersData(viewStyle) {
    const response = await fetch(url);
    const data = await response.json();

    // Limpiar contenido anterior
    cards.innerHTML = '';

    if (viewStyle === "card") {
        displayLogoCards(data.members);
    } else if (viewStyle === "list") {
        displayBusinessList(data.members);
    }
}

// Función para mostrar en vista de tarjetas
const displayLogoCards = (members) => {
    members.forEach(member => {
        let card = document.createElement("section");
        let divisor = document.createElement("div");
        let nameCompany = document.createElement("h2");
        let tagLine = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let portrait = document.createElement("img");

        nameCompany.textContent = member.name;
        tagLine.textContent = `"${member.tagline}"`;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt", `Logo of ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "auto");

        card.appendChild(nameCompany);
        card.appendChild(divisor);
        divisor.appendChild(portrait);
        divisor.appendChild(tagLine);
        divisor.appendChild(address);
        divisor.appendChild(phone);

        cards.appendChild(card);
    });
}

// Función para mostrar en vista de lista
const displayBusinessList = (members) => {
    let list = document.createElement("ul");
    list.classList.add("member-list");

    members.forEach(member => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.tagline}</p>
            <p>${member.address}</p>
            <p>${member.phone}</p>
        `;
        list.appendChild(listItem);
    });

    cards.appendChild(list);
}

// Mostrar tarjetas por defecto al cargar la página
getMembersData("card");