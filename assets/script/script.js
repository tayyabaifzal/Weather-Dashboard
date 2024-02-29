let APIKey = "42747e74a920b7df0770c3dfae22459d";

//Queryselecting existing elements 
let searchBtn = $("#search-button");
let cityInput = $("#search-input");
let sideBar = $("#search-aside");
let todayWeather = $("#today");

//initialising global variables
let citySearch;
var lat;
var long;
let responseGrab; //saved response
let day; //for card number
let cardTimes; //to get weather from same interval on each card
var buttonList = $("#history");
let historyTitle = $("<h4>");
historyTitle.attr("id", "recent-header")
historyTitle.html('<i class="fa-solid fa-clock-rotate-left"></i>  Recent searches:');
var locationBtn;
let locationsArr = [];
let historyArr = [];

//todays weather
let cityName;
let todaysDate;
let tempKelv;
let celsius;
let wind;
let humidity;
let todayIconCode;

//forecast cards
let tempKelvCard;
let celsiusCard = (tempKelvCard - 273.15).toFixed(2);
let windCard;
let humidityCard;
let iconCard;

//5-day forecast cards
let forecast = $("#forecast");
let fiveDayTitle = $("<h3>").addClass("fiveDayTitle");
fiveDayTitle.text("5-Day Forecast:")

//moment.js for dates
let today = moment().format("D/MM/YYYY");
let forecastday1 = moment().add(1, "days").format("D/MM/YYYY");
let forecastday2 = moment().add(2, "days").format("D/MM/YYYY");
let forecastday3 = moment().add(3, "days").format("D/MM/YYYY");
let forecastday4 = moment().add(4, "days").format("D/MM/YYYY");
let forecastday5 = moment().add(5, "days").format("D/MM/YYYY");

// button for location history search
$(document).ready(getHistory());

function getHistory() {
    buttonList.empty();

    historyArr = JSON.parse(localStorage.getItem("searchLocation"));
    console.log(historyArr);

    console.log("locations array here: " + locationsArr);
    if (historyArr !== null) {
        locationsArr = historyArr;
        makeHistoryBtn();
    }
};

function makeHistoryBtn() {
    buttonList.empty();
    console.log("history array: " + historyArr);
    console.log("locations array: " + locationsArr);

    locationsArr = historyArr;
    console.log("locations array now: " + locationsArr);

    if (locationsArr !== null) {
        locationsArr.forEach(item => {
            locationBtn = $("<button>");
            locationBtn.click(prevSearch);
            buttonList.append(locationBtn);
            //add place name
            locationBtn.text(item)
            locationBtn.attr("role", "button");
            locationBtn.addClass("location-button btn-primary")

            buttonList.before(historyTitle);
        })
    };
};


//primary search event listener:
searchBtn.on("click", runSearch);

function runSearch(event) {
    event.preventDefault();
    citySearch = cityInput.val();
    locationsArr.push(citySearch);
    historyArr = locationsArr;
    localStorage.setItem("searchLocation", JSON.stringify(locationsArr));
    
    geoCode(); makeHistoryBtn();
}


//function to display weather from location button
function prevSearch(event) {
    citySearch = $(this).text();
    cityInput.val(citySearch);
    geoCode();
};

//Geocoding function
function geoCode() {
    cityInput.value = "";
    let cityCoords = "https://api.openweathermap.org/geo/1.0/direct?q="+citySearch+"&appid=42747e74a920b7df0770c3dfae22459d"
    $.ajax({
        url: cityCoords,
        method: "GET"
    }).then(function(response) {
    lat = (response[0].lat);
    long = (response[0].lon);
    getWeather();
    });
};


=