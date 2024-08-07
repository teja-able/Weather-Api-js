const apiKey = "ef9c6f39d66bd483aba0aa43fa49473d";
const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const suggestionsList = document.getElementById("suggestions");
const weatherInfo = document.getElementById("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherCity = document.getElementById("weather-city");
const weatherCondition = document.getElementById("weather-condition");
const weatherHumidity = document.getElementById("weather-humidity");
const weatherWind = document.getElementById("weather-wind");
const initialMessage = document.getElementById("initial-message");
const errorMessage = document.getElementById("error-message");

cityInput.addEventListener("input", handleInput);
cityInput.addEventListener("keydown", handleKeyDown);
searchBtn.addEventListener("click", searchWeather);

function handleInput() {
  const input = cityInput.value.toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(input)
  );
  if (filteredSuggestions.length > 0) {
    suggestionsList.innerHTML = filteredSuggestions
      .map(
        (suggestion) =>
          `<li class="text-black p-2 cursor-pointer hover:bg-gray-200" onclick="selectSuggestion('${suggestion}')">${suggestion}</li>`
      )
      .join("");
    suggestionsList.classList.remove("hidden");
  } else {
    suggestionsList.classList.add("hidden");
  }
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
    searchWeather();
  }
}

async function searchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await fetch(apiUrl(city));
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    displayWeatherData(data);
    errorMessage.classList.add("hidden");
    weatherInfo.classList.remove("hidden");
    initialMessage.classList.add("hidden");
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    initialMessage.classList.add("hidden");
  }
}

function selectSuggestion(suggestion) {
  cityInput.value = suggestion;
  suggestionsList.classList.add("hidden");
  searchWeather();
}

function displayWeatherData(data) {
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherTemp.textContent = `${data.main.temp}°C`;
  weatherCity.textContent = data.name;
  weatherCondition.textContent = data.weather[0].main;
  weatherHumidity.textContent = `${data.main.humidity}%`;
  weatherWind.textContent = `${data.wind.speed} km/h`;
}
