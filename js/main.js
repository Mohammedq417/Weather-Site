document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const searchInput = document.querySelector("input[type='search']");
  const weatherContainer = document.querySelector(".weather-container");

  const apiKey = "ec6f4a6e188e40549d7115330241312";
  const baseUrl = "http://api.weatherapi.com/v1";

  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `${baseUrl}/forecast.json?key=${apiKey}&q=${city}&days=3`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      alert("Unable to fetch weather data. Please check the city name.");
      return null;
    }
  }

  function renderWeather(data) {
    const { location, forecast } = data;
    const days = forecast.forecastday;

    weatherContainer.innerHTML = `
      <div class="text-center mb-4">
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>${location.localtime}</p>
      </div>
      <div class="d-flex justify-content-around">
        ${days
          .map(
            (day) => `
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${new Date(day.date).toDateString()}</h5>
              <p class="card-text">
                <strong>Condition:</strong> ${day.day.condition.text}<br>
                <strong>Temp:</strong> ${day.day.avgtemp_c}°C<br>
                <strong>Max Temp:</strong> ${day.day.maxtemp_c}°C<br>
                <strong>Min Temp:</strong> ${day.day.mintemp_c}°C
              </p>
              <img src="${day.day.condition.icon}" alt="Weather Icon">
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const weatherData = await fetchWeather(city);
    if (weatherData) {
      renderWeather(weatherData);
    }
  });
});
