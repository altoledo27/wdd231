//Add JSON
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector("#cards");
//Create a async defined function to fetch data form the JSON source url
async function getProphetData() {
  const response = await fetch(url); // request
  const data = await response.json(); // parse the JSON data
  //console.table(data.prophets); // temp output test of data response 
  displayProphets(data.prophets);
}

const displayProphets = (prophets) =>{
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let dateOfBirth = document.createElement("h3");
        let placeOfBirth = document.createElement("h3");
        let portrait = document.createElement("img");
        
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute("src",prophet.imageurl);
        portrait.setAttribute("alt",`Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        card.appendChild(placeOfBirth);
        card.appendChild(portrait);

        document.querySelector("#cards").appendChild(card);        
    });
}

getProphetData();