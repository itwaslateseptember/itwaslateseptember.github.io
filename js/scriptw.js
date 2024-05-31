// Add the API key and weather-related functions
const API_KEY = '6584e8e2671b72c4f10dbbfcd9671630';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
   .then(response => response.json())
   .then(data => {
      updateBackground(data.weather[0].main);
    })
   .catch(error => console.error(error));
}

function updateBackground(weatherCondition) {
  let backgroundImage;

  switch (weatherCondition) {
    case 'Clear':
      backgroundImage = 'url(img/clear-sky.jpg)';
      break;
    case 'Clouds':
      backgroundImage = 'url(img/cloudy.jpg)';
      break;
    case 'Rain':
      backgroundImage = 'url(img/rainy.jpg)';
      break;
    case 'Snow':
      backgroundImage = 'url(img/snowy.jpg)';
      break;
    default:
      backgroundImage = 'url(img/default.jpg)';
  }

  document.body.style.backgroundImage = backgroundImage;
}

// Call the getLocation function to fetch the weather data
getLocation();

// Update the weather every 30 minutes
setInterval(getLocation, 30 * 60 * 1000);