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


//Display members
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
//Add JSON
const url = "data/members.json";
const cards = document.querySelector("#cards");

//Create a async defined function to fetch data form the JSON source url
async function getMembersData() {
  const response = await fetch(url); // request
  const data = await response.json(); // parse the JSON data
  const members = data.members;

  const filtered = members.filter(member => member.level === 2 || member.level === 3);

  shuffleArray(filtered);
   const selectedMembers = filtered.slice(0, 3);

   selectedMembers.forEach(member => {
    let card = document.createElement("section");
        let divisor = document.createElement("div")
        let nameCompany = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let membership = document.createElement("p");
        let portrait = document.createElement("img");
        
        nameCompany.textContent = `${member.name}`;
        address.textContent = `${member.address}`;
        phone.textContent = `${member.phone}`;
        membership.textContent = `${member.membership}`
        portrait.setAttribute("src", member.image);
        portrait.setAttribute("alt",`Logo of ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        
        card.appendChild(nameCompany);
        card.appendChild(divisor);
        divisor.appendChild(portrait);
        divisor.appendChild(address);
        divisor.appendChild(phone);
        divisor.appendChild(membership);
        

        document.querySelector("#cards").appendChild(card);
   });

}
getMembersData();


//Current Weather
const currentDateTempSpan = document.querySelector("#current-temp");
const currentDateHighTempSpan = document.querySelector("#high-temp");
const currentDateLowTempSpan = document.querySelector("#low-temp");
const currentWeatherHumidity = document.querySelector("#humidity");
const currentWeatherSunriseTime = document.querySelector("#sunrise-time");
const currentWeatherSunsetTime = document.querySelector("#sunset-time");

const currentDateWeatherConditions = document.querySelector("#current-weather-conditions");
const weatherIconImg = document.querySelector("#weather-icon");

const apiKey = "98e9c1cdb138a585460aa1cb6401f5e7";
const lat = "50.11552";
const lon = "8.684966";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

function displayCurrentDayResults(data) {
    currentDateTempSpan.innerHTML = `<strong>${data.main.temp}&deg;C</strong>`;
    currentDateHighTempSpan.innerHTML = `${data.main.temp_max}`;
    currentDateLowTempSpan.innerHTML = `${data.main.temp_min}`;
    const description = data.weather[0].description; 
    currentDateWeatherConditions.textContent = description;

    const sunriseDateStr = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US');
    const sunsetDateStr = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US');

    currentWeatherHumidity.innerHTML = `${data.main.humidity}`;
    currentWeatherSunriseTime.innerHTML = `${sunriseDateStr}`;
    currentWeatherSunsetTime.innerHTML = `${sunsetDateStr}`;

    const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherIconImg.setAttribute("src", icon);
    weatherIconImg.setAttribute("alt", description);
    weatherIconImg.setAttribute("width", 150);
    weatherIconImg.setAttribute("height", 150);
}

function displayForcastResults(data)
{
    if (data.cnt > 2) {
        const dataList = data.list;
        const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        let dayCounter = 0;
        let lastDay = -1;

        dataList.forEach((day) => {
            console.log(day.dt_txt);

            const a = new Date(day.dt_txt);

            const newDay = a.getDay();

            if (lastDay != newDay && (dayCounter < 3)) {
                const dayTemperature = document.querySelector(`#day${dayCounter}temp`);

                dayTemperature.innerHTML = `${day.main.temp}`;

                if (dayCounter > 0) {
                    const dayOfWeek = days[newDay];
                    const dayOfWeekSpan = document.querySelector(`#day${dayCounter}-day-of-week`);
                    dayOfWeekSpan.innerHTML =`<strong>${dayOfWeek}</strong> ` ;
                }
                lastDay = newDay;
                dayCounter += 1;
            }
        });
    }
    else {
        console.log("Error - insufficient data returned by the forecast API")
    }
}


async function apiFetch() {
  try {
    let response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentDayResults(data);// uncomment when ready
    } else {
        throw Error(await response.text());
    }
  response = await fetch(forecastUrl);
            if (response.ok) {
                const data = await response.json();
                displayForcastResults(data); // uncomment when ready
            } else {
                throw Error(await response.text());
            }
    } catch (error) {
        console.error("Error fetching data:", error); // Handle any errors    
    }
}

apiFetch();