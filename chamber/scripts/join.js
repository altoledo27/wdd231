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

//Timestamp
const timestamp = document.querySelector("#timestamp");

timestamp.value = Date.now();

//Membership dialog display
//Add JSON
const url = "data/membership.json";
//Select button
const dialog = document.querySelector("dialog");
const npButton = document.querySelector("#np-membership-button");
const bronzeButton = document.querySelector("#bronze-membership-button");
const silverButton = document.querySelector("#silver-membership-button");
const goldButton = document.querySelector("#gold-membership-button");

//Create a async defined function to fetch data form the JSON source url
async function getMembershipData() {
  const response = await fetch(url);
  const data = await response.json();

  // Each button and its even
  npButton.addEventListener("click", () => showMembershipDetails(data.membership[0]));
  bronzeButton.addEventListener("click", () => showMembershipDetails(data.membership[1]));
  silverButton.addEventListener("click", () => showMembershipDetails(data.membership[2]));
  goldButton.addEventListener("click", () => showMembershipDetails(data.membership[3]));
}

function showMembershipDetails(membership) {
  dialog.innerHTML = '';
  dialog.innerHTML = `
    <button class="close-button">❌</button>
    <h2>${membership.name}</h2>
    <h3>${membership.tagline}</h3>
    <p><strong>Benefits:</strong></p>
  `;

  membership.benefits.forEach(benefit => {
    const p = document.createElement("p");
    p.className = "benefit-text";
    p.textContent = benefit;
    dialog.appendChild(p);
  });

  const closeModal = dialog.querySelector(".close-button");
  closeModal.addEventListener("click", () => {
    dialog.close();
  });

  dialog.showModal();
}

getMembershipData();