var city = "denver"
var apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+',usa&appid=cda51abe369881d5a2a4986a8b0a39d0';
fetch(apiWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      
      for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      
    }
    });

// function getApi() {
  
// };
// getApi();