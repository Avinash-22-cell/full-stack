const API_KEY = "e27b1c7f11234492b3e56656ca9a4585";

const currentWeatherDiv = document.getElementById("current-weather");
// const weatherChartDiv = document.getElementById("weather-chart");
const form = document.querySelector("form");
const cityInput = document.getElementById("city");

// Get user's location and display current weather
navigator.geolocation.getCurrentPosition(getCurrentWeather, showError);

function getCurrentWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const city = data.name;
      displayCurrentWeather(city);
      displayWeatherChart(city);
    })
    .catch((error) => {
      console.log(error);
      showError();
    });
}

function showError() {
  displayCurrentWeather("Delhi");
  displayWeatherChart("Delhi");
}

// Display current weather
function displayCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].description;
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const date = new Date().toLocaleString();
      currentWeatherDiv.innerHTML = `
      <p>Current Weather for ${city}:</p>
    <p>Weather Condition: ${weather}</p>
    <p>Temperature: ${temp}&deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${wind} m/s</p>
    <p>Date and Time: ${date}</p>
  `;
})
.catch((error) => {
  console.log(error);
});
}

// Display weather chart
function displayWeatherChart(city) {
fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
)
.then((response) => response.json())
.then((data) => {
const labels = [];
const tempData = [];
const humidityData = [];
const weatherData = [];
// Format data for chart
data.list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    const time = new Date(item.dt_txt).toLocaleTimeString();
   labels.push(date, time);
    tempData.push(item.main.temp);
    humidityData.push(item.main.humidity);
    weatherData.push(item.weather[0].description);
  });

  // Create chart

  var ctx = document.getElementById('weather-chart'); // node
  // var ctx = document.getElementById('weather-chart').getContext('2d'); // 2d context
  // var ctx = $('weather-chart'); // jQuery instance
  var ctx = 'weather-chart'; // element id

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: tempData,
          borderColor: "#ff6384",
          fill: false,
          yAxisID: "y-axis-1",
        },
        {
          label: "Humidity (%)",
          data: humidityData,
          borderColor: "#36a2eb",
          fill: false,
          yAxisID: "y-axis-2",
        },
      ],
    },
    options: {
      title: {
        display: true,
        text:`7-day Weather Forecast for ${city}`,
      },
      scales: {
        yAxes: [
          {
            id: "y-axis-1",
            type: "linear",
            position: "left",
            ticks: {
              beginAtZero: true,
            },
          },
          {
            id: "y-axis-2",
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
})
.catch((error) => {
  console.log(error);
});
}

// Handle form submit
const formEl=document.getElementById('ff');
ff.addEventListener("submit", (event) => {
event.preventDefault();
const city = cityInput.value;
displayCurrentWeather(city);
displayWeatherChart(city);
});