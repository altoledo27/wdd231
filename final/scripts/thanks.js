const resultsDiv = document.querySelector("#results");
resultsDiv.innerHTML = "";

const formData = new URLSearchParams(window.location.search);

const p1 = document.createElement("p");
const p2 = document.createElement("p");

p1.textContent = `Applicant Name: ${formData.get('first')} ${formData.get('last')}`
p2.textContent = `Email Address: ${formData.get('email')}`

resultsDiv.appendChild(p1);
resultsDiv.appendChild(p2);

