$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geolocation is not working. \nPlease try again another time.");
    }

    $(".fahrenheit").attr("disabled", "disabled");

    $(".celcius").click(function() {
        $(this).attr("disabled", "disabled");
        $(".fahrenheit").removeAttr("disabled");
        $(".temp").animate({ "opacity": 0 }, 250, function() {
            $(this).text(toC(temperature) + "\xB0C");
        });
        $(".temp").animate({ "opacity": 1 }, 250);
    });

    $(".fahrenheit").click(function() {
        $(this).attr("disabled", "disabled");
        $(".celcius").removeAttr("disabled");
        $(".temp").animate({ "opacity": 0 }, 250, function() {
            $(this).text(toF(temperature) + "\xB0F");
        });
        $(".temp").animate({ "opacity": 1 }, 250);
    });

});

var temperature = 0;

function success(location) {
    var lat = location.coords.latitude;
    var long = location.coords.longitude;

    var cityJSONLocation = " https://www.geocode.farm/v3/json/reverse/?lat=" + lat + "&lon=" + long;

    $.getJSON(cityJSONLocation, function(city) {
        $(".location").text(city["geocoding_results"]["RESULTS"][1]["ADDRESS"]["locality"]);
    }, function(err) {
        $(".location").text("Weather Conditions Outside");
    });

    var weatherJSONLocation = "https://api.darksky.net/forecast/b1be7136a4865d4047669e491bd0e2b8/" + lat + "," + long;

    $.ajax({
        url: "https://api.darksky.net/forecast/b1be7136a4865d4047669e491bd0e2b8/" + lat + "," + long,
        dataType: 'jsonp',
        success: function(weather) {
            temperature = Math.round(weather["currently"]["temperature"]);
            $(".description").html(weather["currently"]["summary"].toUpperCase());
            $(".temp").text(temperature + "\xB0F");

            changeBackground(weather["currently"]["icon"]);
        },
        error: function(err) {
            alert("Error!");
        }
    });
}

function toF(temp) {
    temperature = Math.round((temp * 9 / 5) + 32);
    return temperature;
}

function toC(temp) {
    temperature = Math.round((temp - 32) * 5 / 9);
    return temperature;
}

function changeBackground(icon) {
    console.log("function called " + icon);
    var iconPath;
    switch (icon) {
        case "clear-day":
            iconPath = "clear_day.jpg";
            break;
        case "clear-night":
            iconPath = "clear_night.jpg";
            break;
        case "rain":
            iconPath = "rain.jpg";
            break;
        case "snow":
        case "sleet":
            iconPath = "snow.jpg";
            break;
        case "wind":
            iconPath = "windy.jpg";
            break;
        case "fog":
            iconPath = "fog.jpg";
            break;
        case "cloudy":
            iconPath = "cloudy.jpg";
            break;
        case "partly-cloudy-day":
        case "partly-cloudy-night":
            iconPath = "partly_cloudy.jpg";
            break;
        default:
            iconPath = "clear_day.jpg";
    }
    $(".background").animate({ "opacity": 0 }, 1000, function() {
        $(this).attr("src", iconPath);
    });
    $(".background").animate({ "opacity": 1 }, 1000);
}
