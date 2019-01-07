$(document).ready(function () {
  let city;
  let url;
  let key = "ccf31ad40fb6d05a1f40b2802a01eada";

  $("#form").submit(function (event) {
    city = $("#userInput")
      .val()
      .toLowerCase();
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    console.log(city);
    console.log(url);
    $.getJSON({
        url
      })
      .done(function (data) {
        //console.log(data);
        let name = data["name"];
        let weatherMain = data.weather[0].main;
        //let weatherDesc = data.weather[0].description;
        let temp = Math.round(data.main.temp).toString();
        //let highTemp = data.main.temp_max.toString();
        //let lowTemp = data.main.temp_min.toString();
        let icon = data.weather[0].icon;
        let iconURL = `http://openweathermap.org/img/w/${icon}.png`;
        $("#result").html(name);
        $("#weather").html(weatherMain);
        $("#weatherIcon").attr("src", `${iconURL}`);
        $("#weatherIcon").attr("width", 100);
        $("#weatherIcon").attr("height", 100);
        $("#bigTemp").html(`${temp}&#8451;`);
        $("#form").each(function () {
          this.reset();
        });
      })
      .fail(function (xhr, status, error) {
        $("#result").html(
          `City "${city}" not found, please enter a valid city.`
        );
        $("#weather").html("");
        $("#weatherIcon").attr("width", 0);
        $("#weatherIcon").attr("height", 0);
        $("#bigTemp").html("");
        $("#form").each(function () {
          this.reset();
        });
      });

    event.preventDefault();
  });
});

var $loading = $("#loading").hide();
$(document)
  .ajaxStart(function () {
    $loading.show();
  })
  .ajaxStop(function () {
    $loading.hide();
  });