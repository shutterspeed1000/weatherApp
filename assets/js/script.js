var searchCount = 0
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
var loc = $(`#cityInp`).val()
$(`#cities`).prepend(`<button class="btn btn-primary active searched" role="button" style ="width: 100%"  aria-pressed="true">${loc}</button>`)
searchCount++


}

})



// Location Search




// Weather Search


