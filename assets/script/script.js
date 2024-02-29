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

//5-day forecast cards:
let forecast = $("#forecast");
let fiveDayTitle = $("<h3>").addClass("fiveDayTitle");
fiveDayTitle.text("5-Day Forecast:")
