var userInput = "";
var userInput = localStorage.getItem("Search-city", userInput);

var key = "cda51abe369881d5a2a4986a8b0a39d0";

currentWeather(userInput);

var historyList = JSON.parse(localStorage.getItem("City-list")) || [];
for (var i = 0; i < historyList.length; i++) {
  list = $("<li class='list-group-item'>")
    .text(historyList[i])
    .click(function (event) {
      currentWeather(event.target.innerText);
      $("#searchField").val(event.target.innerText);
    });
  $("#city-list").append(list);
}

function currentWeather(searchCity) {
  var apiWeather =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    searchCity +
    ",usa&units=imperial&appid=" +
    key;
  fetch(apiWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $("#cityName").text("(" + moment().format("dddd, MMMM Do") + ")");
      $("#cityName").append(" " + data.city.name);
      var getIcon = data.list[0].weather[0].icon;
      var icon = "http://openweathermap.org/img/wn/" + getIcon + "@2x.png";
      $("#cityName").append("<img src=" + icon + ">");
      $("#cityName").append(
        "<br/><br/>" + "Temperature: " + data.list[0].main.temp + " F"
      );
      $("#cityName").append(
        "<br/><br/>" + "Humidity: " + data.list[0].main.humidity + "%"
      );
      $("#cityName").append(
        "<br/><br/>" + "Wind Speed: " + data.list[0].wind.speed + " MPH"
      );

      var laT = data.city.coord.lat;
      var loN = data.city.coord.lon;
      var uV =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        laT +
        "&lon=" +
        loN +
        "&cnt=1&appid=" +
        key;

      fetch(uV)
        .then(function (uVresponse) {
          return uVresponse.json();
        })
        .then(function (data) {
          console.log(data);
          var uvIndex = data[0].value;
          var classToApply = "";

          if (uvIndex >= 0 && uvIndex <= 2) {
            classToApply = "noRisk";
          } else if (uvIndex > 2 && uvIndex <= 5) {
            classToApply = "littleRisk";
          } else if (uvIndex > 5 && uvIndex <= 7) {
            classToApply = "highRisk";
          } else if (uvIndex > 7 && uvIndex <= 10) {
            classToApply = "veryHighRisk";
          } else {
            classToApply = "extremeRisk";
          }

          $("#cityName").append(
            "<br/><br/>" +
              "<span >UV Index: </span><span class='" +
              classToApply +
              "'>" +
              data[0].value +
              "</span>"
          );
        });
      forcastWeather(laT, loN);
    });
}

function forcastWeather(laT, loN) {
  var daily =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    laT +
    "&lon=" +
    loN +
    "&units=imperial&appid=" +
    key;
  fetch(daily)
    .then(function (dResponse) {
      return dResponse.json();
    })
    .then(function (dData) {
      var cardOne = $("#day-one");
      var cardTwo = $("#day-two");
      var cardThree = $("#day-three");
      var cardFour = $("#day-four");
      var cardFive = $("#day-five");
      cardOne.empty();
      cardTwo.empty();
      cardThree.empty();
      cardFour.empty();
      cardFive.empty();

      function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + "/" + date + "/" + year;
        return time;
      }
      if (dData.daily.length > 0) {
        var getDailyIconOne = dData.daily[1].weather[0].icon;
        var iconOne =
          "http://openweathermap.org/img/wn/" + getDailyIconOne + "@2x.png";
        var timeOne = $("<p>");
        var tempOne = $("<p>");
        timeOne.text(timeConverter(dData.daily[1].dt));
        cardOne.append(timeOne);
        tempOne.text("Temp: " + dData.daily[1].temp.day + " F");
        cardOne.append("<img src=" + iconOne + ">");
        cardOne.append(tempOne);

        var getDailyIconTwo = dData.daily[2].weather[0].icon;
        var iconTwo =
          "http://openweathermap.org/img/wn/" + getDailyIconTwo + "@2x.png";
        var timeTwo = $("<p>");
        var tempTwo = $("<p>");
        timeTwo.text(timeConverter(dData.daily[2].dt));
        cardTwo.append(timeTwo);
        tempTwo.text("Temp: " + dData.daily[2].temp.day + " F");
        cardTwo.append("<img src=" + iconTwo + ">");
        cardTwo.append(tempTwo);

        var getDailyIconThree = dData.daily[3].weather[0].icon;
        var iconThree =
          "http://openweathermap.org/img/wn/" + getDailyIconThree + "@2x.png";
        var timeThree = $("<p>");
        var tempThree = $("<p>");
        timeThree.text(timeConverter(dData.daily[3].dt));
        cardThree.append(timeThree);
        tempThree.text("Temp: " + dData.daily[3].temp.day + " F");
        cardThree.append("<img src=" + iconThree + ">");
        cardThree.append(tempThree);

        var getDailyIconFour = dData.daily[4].weather[0].icon;
        var iconFour =
          "http://openweathermap.org/img/wn/" + getDailyIconFour + "@2x.png";
        var timeFour = $("<p>");
        var tempFour = $("<p>");
        timeFour.text(timeConverter(dData.daily[4].dt));
        cardFour.append(timeFour);
        tempFour.text("Temp: " + dData.daily[4].temp.day + " F");
        cardFour.append("<img src=" + iconFour + ">");
        cardFour.append(tempFour);

        var getDailyIconFive = dData.daily[5].weather[0].icon;
        var iconFive =
          "http://openweathermap.org/img/wn/" + getDailyIconFive + "@2x.png";
        var timeFive = $("<p>");
        var tempFive = $("<p>");
        timeFive.text(timeConverter(dData.daily[5].dt));
        cardFive.append(timeFive);
        tempFive.text("Temp: " + dData.daily[4].temp.day + " F");
        cardFive.append("<img src=" + iconFive + ">");
        cardFive.append(tempFive);
      }
    });
}

$(".btn").on("click", function (event) {
  event.preventDefault();
  userInput = $(".form-control").val().toUpperCase();
  if (userInput !== "") {
    localStorage.setItem("Search-city", userInput);

    currentWeather(userInput);
    // alemenat duplicat val
    if (historyList.indexOf(userInput) === -1) {
      list = $("<li>").text(userInput);
      $("#city-list").append(list);
      historyList.push(userInput);
      localStorage.setItem("City-list", JSON.stringify(historyList));
    }
  }
});
