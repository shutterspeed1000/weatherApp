

var searchCount = 0
var dayURL = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial"
var locURL = "http://api.openweathermap.org/geo/1.0/direct?q=Orlando&limit=5&appid=bf922896d93871f3fce26701fa6fe44c"
var loc = ""
var lat = ""
var lon = ""


// Start Search and add history tile
$('#search').click(function() {

if(searchCount > 4){
    $(`.citylist .searched`).last().remove()
searchCount--
}

if (searchCount <= 4) {
loc = $(`#cityInp`).val()
$(`#cities`).prepend(`<button class="btn btn-primary active searched" role="button" style ="width: 100%"  aria-pressed="true">${loc}</button>`)
searchCount++


}

})



// Location Search

function locationSearch()
{
    
    fetch(locURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => {
    
      });
    
    console.log(loc)
    console.log(data)
        
    
   


}


// Weather Search

// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bf922896d93871f3fce26701fa6fe44c

// function getReport() {


// }
