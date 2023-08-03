//DateJS for time conversions
dayjs().format();

// Variables used outside of functions
var searchCount = 0;
var dayURL = "";
var loc = "";
var lat = "";
var lon = "";
var locURL = "";
var fiveDURL = "";

// Start Search and add history tiles as each are created - starts to overwrite at #5

$("#search").click(function () {
  // set buttons to overwrite when search boxes are full
  if (searchCount === 5) {
    searchCount = 0;
  }

  // create url for location lookup (lat/long)

  loc = $(`#cityInp`).val();
  $(`.searched${searchCount}`).text(loc);
  searchCount++;
  locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=bf922896d93871f3fce26701fa6fe44c`;

  locationSearch();
});

//Click function for history buttons
$(document).on(`click`, `.search`, function (event) {
  loc = $(this).text();
  console.log(loc);
  locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=bf922896d93871f3fce26701fa6fe44c`;
  locationSearch();
});

// Location Search - URL created from input and pulls the lat and lon from it.

function locationSearch() {
  // send location lookup to api
  fetch(locURL)
    .then((response) => response.json())
    .then((location) => {
      console.log(location);

      // Place current location on page
      $(`#owLocation`).text(location[0].name + ", " + location[0].state);
      lat = location[0].lat;
      lon = location[0].lon;

      dayURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial`;
      fiveDURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial&exclude=current,minutely,hourly,alerts`;
    });
}

// Weather Search

function weatherSearch() {
  fetch(dayURL)
    .then((response) => response.json())
    .then((currentW) => {
      console.log(currentW);

      $(`#dayDate`).text(
        `Date: ${dayjs.unix(currentW.dt).format("MM-DD-YYYY")}`
      );
      $(`#dayTemp`).text(`Temp: ${currentW.main.temp}`);
      $(`#dayWind`).text(`Wind: ${currentW.wind.speed}`);
      $(`#dayHum`).text(`Humidity: ${currentW.main.humidity}`);
      $("#dayIcon").attr(
        "src",
        `https://openweathermap.org/img/w/${currentW.weather[0].icon}.png`
      );
    });
  // send location lookup to api
  fetch(fiveDURL)
    .then((response) => response.json())
    .then((fiveDay) => {
      console.log(fiveDay);
      $(`#fiveDDate`).text(
        `Date: ${dayjs.unix(fiveDay.list[0].dt).format("MM-DD-YYYY")}`
      );
      $(`#fiveDTemp`).text(`Temp: ${fiveDay.list[0].main.temp}`);
      $(`#fiveDWind`).text(`Wind: ${fiveDay.list[0].wind.speed}`);
      $(`#fiveDHum`).text(`Humidity: ${fiveDay.list[0].main.humidity}`);
      $("#fiveDIcon").attr("src",`https://openweathermap.org/img/w/${fiveDay.list[0].weather[0].icon}.png`);



    });
}

// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bf922896d93871f3fce26701fa6fe44c

// function getReport() {

// }
