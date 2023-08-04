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

$(document).ready(function () {
  // loop to display items in local storage
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var savedsrc = localStorage.getItem(key);

    $(`.searched${i}`).text(savedsrc);
  }
});

// Start Search and add history tiles as each are created - starts to overwrite at #5
// $("#search").click(function ()

$("#citySelect").on("submit", function (event) {
  // set buttons to overwrite when search boxes are full
  if (searchCount === 9) {
    searchCount = 0;
  }

  // create url for location lookup (lat/long)
  event.preventDefault();
  loc = $(`#cityInp`).val();
  $(`.searched${searchCount}`).text(loc);
  searchCount++;
  locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=bf922896d93871f3fce26701fa6fe44c`;
  localStorage.setItem(searchCount, loc);
  $(`#cityInp`).val("");
  $(`.card-body`).removeClass("invisible");
  locationSearch();
});

//Click function for history buttons
$(document).on(`click`, `.search`, function (event) {
  loc = $(this).text();
  locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=bf922896d93871f3fce26701fa6fe44c`;
  $(`.card-body`).removeClass("invisible");
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
      dailySearch();
      fiveDaySearch();
    })
    .catch((error) => {
      alert("Please enter a valid city name as City,State and try again.");
      $(`.card-body`).addClass("invisible")

    });
}

// Daily Stats
function dailySearch() {
  fetch(dayURL)
    .then((response) => response.json())
    .then((currentW) => {
      $(`#dayDate`).text(
        `${dayjs.unix(currentW.dt).format("MM-DD-YYYY")}`
      );
      $(`#dayTemp`).text(`Temp: ${currentW.main.temp}`);
      $(`#dayWind`).text(`Wind: ${currentW.wind.speed}`);
      $(`#dayHum`).text(`Humidity: ${currentW.main.humidity}`);
      $("#dayIcon").attr(
        "src",
        `https://openweathermap.org/img/w/${currentW.weather[0].icon}.png`
      );
    });
}

// 5 Days stats
function fiveDaySearch() {
  return fetch(fiveDURL)
    .then((response) => response.json())
    .then((fiveDay) => {
      var t = 4;
      // Day 1
      $(`#date1`).text(
        `${dayjs.unix(fiveDay.list[t].dt).format("MM-DD-YY")}`
      );
      $(`#temp1`).text(`Temp: ${fiveDay.list[t].main.temp}`);
      $(`#wind1`).text(`Wind: ${fiveDay.list[t].wind.speed}`);
      $(`#hum1`).text(`Humidity: ${fiveDay.list[t].main.humidity}`);
      $(`#icon1`).attr(
        "src",
        `https://openweathermap.org/img/w/${fiveDay.list[t].weather[0].icon}.png`
      );
      var t = 12;
      // Day 2
      $(`#date2`).text(
        `${dayjs.unix(fiveDay.list[t].dt).format("MM-DD-YY")}`
      );
      $(`#temp2`).text(`Temp: ${fiveDay.list[t].main.temp}`);
      $(`#wind2`).text(`Wind: ${fiveDay.list[t].wind.speed}`);
      $(`#hum2`).text(`Humidity: ${fiveDay.list[t].main.humidity}`);
      $(`#icon2`).attr(
        "src",
        `https://openweathermap.org/img/w/${fiveDay.list[t].weather[0].icon}.png`
      );
      var t = 20;
      // Day 3
      $(`#date3`).text(
        `${dayjs.unix(fiveDay.list[t].dt).format("MM-DD-YY")}`
      );
      $(`#temp3`).text(`Temp: ${fiveDay.list[t].main.temp}`);
      $(`#wind3`).text(`Wind: ${fiveDay.list[t].wind.speed}`);
      $(`#hum3`).text(`Humidity: ${fiveDay.list[t].main.humidity}`);
      $(`#icon3`).attr(
        "src",
        `https://openweathermap.org/img/w/${fiveDay.list[t].weather[0].icon}.png`
      );
      var t = 28;
      // Day 4
      $(`#date4`).text(
        `${dayjs.unix(fiveDay.list[t].dt).format("MM-DD-YY")}`
      );
      $(`#temp4`).text(`Temp: ${fiveDay.list[t].main.temp}`);
      $(`#wind4`).text(`Wind: ${fiveDay.list[t].wind.speed}`);
      $(`#hum4`).text(`Humidity: ${fiveDay.list[t].main.humidity}`);
      $(`#icon4`).attr(
        "src",
        `https://openweathermap.org/img/w/${fiveDay.list[t].weather[0].icon}.png`
      );
      var t = 36;
      // Day 5
      $(`#date5`).text(
        `${dayjs.unix(fiveDay.list[t].dt).format("MM-DD-YY")}`
      );
      $(`#temp5`).text(`Temp: ${fiveDay.list[t].main.temp}`);
      $(`#wind5`).text(`Wind: ${fiveDay.list[t].wind.speed}`);
      $(`#hum5`).text(`Humidity: ${fiveDay.list[t].main.humidity}`);
      $(`#icon5`).attr(
        "src",
        `https://openweathermap.org/img/w/${fiveDay.list[t].weather[0].icon}.png`
      );
    });
}
