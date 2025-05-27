const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const key= "98e9c1cdb138a585460aa1cb6401f5e7";
const lat ="49.75";
const lon = "6.64";
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const description = data.weather[0].description;
    const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherIcon.setAttribute("src", icon);
    weatherIcon.setAttribute("alt", description);
    weatherIcon.setAttribute("width", 50);
    weatherIcon.setAttribute("height", 50);

    captionDesc.textContent = description;
}

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log("Error fetching data", error);
  }
}

apiFetch();