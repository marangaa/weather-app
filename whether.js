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
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  return await response.json();
}

