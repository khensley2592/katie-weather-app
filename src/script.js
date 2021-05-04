let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 55;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 12;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h1");
  let cityInput = document.querySelector("#search-text-input");
  cityElement.innerHTML = cityInput.value;
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;
    let city = cityInput.value;
    let units = "imperial";
    let apiKey = "a4274e99abef8206a6b90c500ed8b868";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  } else {
    cityElement.innerHTML = null;
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `${temperature}`;

  let skyDescription = document.querySelector("#current");
  skyDescription.innerHTML = response.data.weather[0].description;
}

function geoTemperature(response) {
  let geoTemp = Math.round(response.data.main.temp);
  let geoData = document.querySelector("#temperature");
  geoData.innerHTML = `${geoTemp}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiKey = "a4274e99abef8206a6b90c500ed8b868";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrlGeo = `${apiEndpoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlGeo).then(geoTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
