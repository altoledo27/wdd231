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
const url = "data/members.JSON";
const cards = document.querySelector("#cards");
//Create a async defined function to fetch data form the JSON source url
async function getMembersData() {
  const response = await fetch(url); // request
  const data = await response.json(); // parse the JSON data
  //console.table(data.prophets); // temp output test of data response 
  displayMembers(data.members);
}

const displayMembers = (members) =>{
    members.forEach(member => {
        let card = document.createElement("section");
        let divisor = document.createElement("div")
        let nameCompany = document.createElement("h2");
        let tagLine = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let portrait = document.createElement("img");
        
        nameCompany.textContent = `${member.name}`;
        tagLine.textContent = `"${member.tagline}"`;
        address.textContent = `Address: ${member.address}`;
        phone.textContent = `Phone: ${member.phone}`;
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt",`Logo of ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        
        card.appendChild(nameCompany);
        card.appendChild(divisor);
        divisor.appendChild(portrait);
        divisor.appendChild(tagLine);
        divisor.appendChild(address);
        divisor.appendChild(phone);
        

        document.querySelector("#cards").appendChild(card);        
    });
}

getMembersData();