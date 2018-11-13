$(document).ready(function() {
  let city;
  let url;
  let key = "ccf31ad40fb6d05a1f40b2802a01eada";

  $("#form").submit(function(event) {
    city = $("#userInput")
      .val()
      .toLowerCase();
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    // console.log(city);
    // console.log(url);
    $.getJSON({ url })
      .done(function(data) {
        console.log(data);
        let name = data["name"];
        let weatherMain = data.weather[0].main.toLowerCase();
        let weatherDesc = data.weather[0].description;
        let temp = Math.round(data.main.temp).toString();
        let highTemp = data.main.temp_max.toString();
        let lowTemp = data.main.temp_min.toString();

        $("#result").html(
          `Today in ${name}, it's ${temp}&#8451;, the weather is ${weatherMain} /w ${weatherDesc}.\nThe high is ${highTemp}&#8451; and the low is ${lowTemp}&#8451;.`
        );
      })
      .fail(function(xhr, status, error) {
        $("#result").html(
          `City "${city}" not found, please enter a valid city.`
        );
        console.log(
          "Result: " +
            status +
            " " +
            error +
            " " +
            xhr.status +
            " " +
            xhr.statusText
        );
      });

    event.preventDefault();
  });
});
/*
{"coord":{"lon":32.85,"lat":39.92},
"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
"base":"stations",
"main":{"temp":285.15,"pressure":1024,"humidity":50,"temp_min":284.15,"temp_max":286.15},
"visibility":10000,
"wind":{"speed":2.1,"deg":10},
"clouds":{"all":75},"dt":1542106200,
"sys":{"type":1,"id":6021,"message":0.0048,
"country":"TR",
"sunrise":1542083489,
"sunset":1542119633},
"id":323786,
"name":"Ankara",
"cod":200}*/
