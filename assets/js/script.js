
// Variables used outside of functions
var searchCount = 0
var dayURL = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial"
var loc = ""
var lat = ""
var lon = ""
var locURL = ""


// Start Search and add history tiles as each are created - starts to overwrite at #5

$('#search').click(function() {

if(searchCount > 4){
    $(`.citylist .searched`).last().remove()
searchCount--
}

if (searchCount <= 4) {
loc = $(`#cityInp`).val()
$(`#cities`).prepend(`<button class="btn btn-primary active searched" role="button" style ="width: 100%"  aria-pressed="true">${loc}</button>`)
searchCount++
locURL = `https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=1&appid=bf922896d93871f3fce26701fa6fe44c`

}

})



// Location Search - URL created from input and pulls the lat and lon from it.

function locationSearch()
{
    
    fetch(locURL)
      .then(response => response.json())
      .then(location => {

         console.log(location)

   lat = location[0].lat
   lon = location[0].lon
    
      });
    
  
    
   


}


// Weather Search

// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=bf922896d93871f3fce26701fa6fe44c&units=imperial

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=bf922896d93871f3fce26701fa6fe44c

// function getReport() {


// }
