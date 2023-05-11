const locationForm = document.querySelector('#location-form');

locationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get the location input value
  const location = document.querySelector('#location-input').value;

  // Call the getWeather function with the location as the parameter
  const weather = await getWeather(location);

  // Update the UI with the weather data
  updateUI(weather);
});

async function getWeather(location) {
  const apiKey = '92f4af4d809cd7f72786b822dd641409';
  const geocodingUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = await geocodingResponse.json();
  const { lat, lon } = geocodingData[0];

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const weatherResponse = await fetch(weatherUrl);
  return await weatherResponse.json();
}



function updateUI(weather) {
  const temperature = weather.main.temp; // Define temperature variable using the weather data
  const weatherDescription = weather.weather[0].description;
  const location = weather.name;

  // Create a div to hold the weather data
  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weather-data');

  // Create and append elements for temperature, weather description, and location
  const tempElement = document.createElement('p');
  tempElement.textContent = `Temperature: ${temperature}°C`;
  weatherDiv.appendChild(tempElement);

  const descElement = document.createElement('p');
  descElement.textContent = `Weather: ${weatherDescription}`;
  weatherDiv.appendChild(descElement);

  const locElement = document.createElement('p');
  locElement.textContent = `Location: ${location}`;
  weatherDiv.appendChild(locElement);

  // Append the weather div to the weather-info div in the HTML
  const weatherInfo = document.querySelector('#weather-info');
  weatherInfo.innerHTML = ''; // Clear any previous weather data
  weatherInfo.appendChild(weatherDiv);
}
