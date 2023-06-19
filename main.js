
// api object with two properties key and base

const api = {
  // holds the API key provided by OpenWeatherMap.
  key: "fcc8de7015bbb202209bbf0261babf4c",
 // holds the base URL for the OpenWeatherMap API,
 // which is the starting point for constructing API requests.
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
// sets an event listener on search box element to detect when "enter" is pressed
searchbox.addEventListener('keypress', setQuery);
 
// retrieves the values of search box and passes to getresults function
function setQuery(evt) {
  // ==13 corresponds to "enter" key
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// for further processing, such as making an API request to fetch weather data.

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

// responsible for updating the HTML elements on the 
// page with the weather information obtained from the API response.
function displayResults (weather) {
  let city = document.querySelector('.location .city');
  // sets the inner text of the city element to 
  //display the name of the city and the country code obtained from the weather object.
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  // Date object representing the current date and time
  let now = new Date();
  let date = document.querySelector('.location .date');

  //dateBuilder function is expected to format the date
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  // display the temperature obtained from the weather object.
  //temperature is rounded to the nearest whole number,
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

    // sets the inner text of the hilow element to display the minimum 
    //and maximum temperatures obtained from the weather object.
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

// takes a Date object as an argument, extracts the necessary information, and returns a formatted date string.
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}