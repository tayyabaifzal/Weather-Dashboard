//Queryselecting existing elements 
let searchBtn = $("#search-button");
let searchInput = $("#search-input");
let sideBar = $("#search-aside");
let todayWeather = $("#today");

//initialising variables
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
var locationButton;
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
let tempKelvFC;
let celsiusFC = (tempKelvFC - 273.15).toFixed(2);
let windFC;
let humidityFC;
let iconFC;

//5-day forecast cards:
let forecast = $("#forecast");
let fiveDayTitle = $("<h3>").addClass("fiveDayTitle");
fiveDayTitle.text("5-Day Forecast:")

//moment.js for dates:
let today = moment().format("D/MM/YYYY");
let day1 = moment().add(1, "days").format("D/MM/YYYY");
let day2 = moment().add(2, "days").format("D/MM/YYYY");
let day3 = moment().add(3, "days").format("D/MM/YYYY");
let day4 = moment().add(4, "days").format("D/MM/YYYY");
let day5 = moment().add(5, "days").format("D/MM/YYYY");


// button for location history search
$(document).ready(getHistory());


function getHistory(){
    buttonList.empty();

    historyArr = JSON.parse(localStorage.getItem("searchLocation"));
    console.log(historyArr);
    
    console.log("locations array here: " + locationsArr);
    if (historyArr !== null) {
        locationsArr = historyArr;
        makeHistoryButton();
    }
};



function makeHistoryButton() {
    buttonList.empty();
    console.log("history array: " + historyArr);
    console.log("locations array: " + locationsArr);

    
    locationsArr = historyArr;
    console.log("locations array now: " + locationsArr);
    // historyArr = locationsArr;
    if (locationsArr !== null) {
    locationsArr.forEach(item => {
    //create button
    
    locationButton = $("<button>");
    locationButton.click(prevSearch);
    buttonList.append(locationButton);
    //add place name
    locationButton.text(item)
    locationButton.attr("role", "button");
    locationButton.addClass("location-button btn-primary")

    buttonList.before(historyTitle);
    })};
};


//primary search event listener:
searchBtn.on("click", runSearch);


function runSearch(event) {
    event.preventDefault();
    citySearch = searchInput.val();
    // const storageTest = localStorage.getItem("searchLocation");
    // if (storageTest !== null) {
        // locationsArr = JSON.parse(localStorage.getItem("searchLocation"));
    // };
    locationsArr.push(citySearch);
    historyArr = locationsArr;
    localStorage.setItem("searchLocation", JSON.stringify(locationsArr));
    
    geoCode(); makeHistoryButton();
}



//function to display weather from location button
function prevSearch(event) {
    // event.preventDefault();
    citySearch = $(this).text();
    searchInput.val(citySearch);
    geoCode();
};


//Geocoding function
function geoCode() {
    searchInput.value = "";
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



//get Weather function
function getWeather(){
    // searchInput.val("");
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=42747e74a920b7df0770c3dfae22459d&units=metric";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        responseGrab = response;  
        cityName = response.city.name;
        todaysDate = response.list[0].dt_txt;
        
        celsius = (response.list[0].main.temp).toFixed(1);
        todayIconCode = response.list[0].weather[0].icon;

        wind = response.list[0].wind.speed;
        humidity =  response.list[0].main.humidity;
    showToday();
    });
};




//show Weather function
function showToday() {
    todayWeather.empty();

    const weatherToday = $("<div>")
    let todayHeader = $("<h3>");
    let todayTemp = $("<p>").attr("id", "today-temp").addClass("today-text");
    let todayWind = $("<p>").attr("id", "today-wind").addClass("today-text");
    let todayHumidity= $("<p>").attr("id", "today-humid").addClass("today-text");
    let iconDiv = $("<img>");

    todayHeader.html(cityName + " ("+ today + ") ") //+ icon
    let iconURL = "https://openweathermap.org/img/wn/" + todayIconCode + "@2x.png";
    todayHeader.attr("id", "todayHeader")
    todayTemp.text("Temp: " + celsius +  "°c");
    todayWind.text("Wind speed: " + wind + "KPH")
    todayHumidity.text("Humidity: " + humidity + "%");

    weatherToday.append(todayHeader);
    weatherToday.append(todayTemp);
    weatherToday.append(todayWind);
    weatherToday.append(todayHumidity);
    todayWeather.append(weatherToday);

    iconDiv.attr("src", iconURL);
    todayHeader.append(iconDiv)

    makeCards(); 
}



//makes cards for 5-day forecast
function makeCards(){ 
    todayWeather.after(fiveDayTitle);
    forecast.empty();
    day = 1;
    cardTimes = [4, 12, 20, 28, 36];

    for (let i = 0; i < cardTimes.length; i ++){
    //moment.js
        let dayX = moment().add(day, "days").format("D/MM/YYYY");
    //create card
        let forecastCard = $("<div>").addClass("card card1 col-sm-12 col-lg-2 col-md-3");
    // give card ID
        forecastCard.attr("id", "day"+(day))


// designing cards:
    let cardTitle = $("<h5>").addClass("card-title");
    let cardIcon = $("<img>");
    let cardTemp =  $("<p>").addClass("card-text");
    let cardWind =  $("<p>").addClass("card-text");
    let cardHumidity =  $("<p>").addClass("card-text");


// grab info for cards
    celsiusFC = (responseGrab.list[cardTimes[i]].main.temp).toFixed(1);
    windFC = responseGrab.list[cardTimes[i]].wind.speed;
    humidityFC =  responseGrab.list[cardTimes[i]].main.humidity;
    iconFC = responseGrab.list[cardTimes[i]].weather[0].icon;
    let iconURL = "https://openweathermap.org/img/wn/" + iconFC + "@2x.png";


// setting card content:
    cardTitle.text(dayX);
    cardIcon.attr("src", iconURL);
    cardTemp.text("Temp: " + celsiusFC + "°c");
    cardWind.text("Wind: " + windFC + "KPH");
    cardHumidity.text("Humidity: " + humidityFC + "%");
// appending cards:
    forecastCard.append(cardTitle);
    forecastCard.append(cardIcon);
    forecastCard.append(cardTemp);
    forecastCard.append(cardWind);
    forecastCard.append(cardHumidity);
    forecast.append(forecastCard);

    day++; 
    }
};


//clear button:
let clearBtn = $("<button>");
clearBtn.attr("id", "clear-button");
clearBtn.html('<i class="fa-regular fa-trash-can"></i> Clear history');
sideBar.append(clearBtn);

clearBtn.on("click", function(event){
    localStorage.clear();
    buttonList.empty();
    locationsArr = [];
    historyArr = [];
})
