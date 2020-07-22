// async functions to get requests
async function getIP() {
    var response = await fetch("https://api.ipify.org/?format=json");
    var data = await response.json();
    return data;
}

async function getLocation(ip) {
    var response = await fetch(`http://ip-api.com/json/${ip.ip}`);
    var data = await response.json();
    return data;
}

async function getWeatherData(location) {
    var key = "e04ce75969c48da6f29a8e34552e31b3";
    var response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location.zip},${location.countryCode}&appid=${key}&units=metric`);
    var data = await response.json();
    return data;
}

// global variables for time setup
var current = new Date();
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var day = days[current.getDay() - 1];
var hour = current.getHours();
var minute = current.getMinutes();
var dn = ["AM", "PM"];
var timeString = `${day}, <span style="color:#e68727"> ${(String(hour % 12)).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${dn[Math.floor(hour / 12)]}</span>`;
var wData;



// making requests
getIP().then(zip => {
    getLocation(zip).then(location => {
        getWeatherData(location).then(data => {
            wData = data;
            // update document when loaded
            $(document).ready( function() {
                $("#time").html(timeString);
                $("#city").text(location.city);
                $("#weather-status").text(wData.weather[0].main);
                $("#icon").attr("src", `http://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`);
                var temp = wData.main.temp;
                $("#tempc").text(Math.round(temp));
                $("#tempf").text(Math.round(temp * 1.8 + 32));
                $("#hum").text(`Humidity: ${wData.main.humidity}%`);
                $("#wind").text(`Wind: ${(wData.wind.speed*3.6).toFixed(2)} km/h`);

                // action listeners to switch units
                $("#f").click(function() {
                    // hide celcius temp
                    $("#tempc").css("display", "none");
                    // disable fahrenheit option
                    $(this).addClass("disabled");
                    // display fahrenheit temp
                    $("#tempf").css("display", "inline");
                    // make other option available
                    $("#c").removeClass("disabled");
                    // update wind speed
                    $("#wind").text(`Wind: ${(wData.wind.speed*2.237).toFixed(2)} mph`);
                });
                $("#c").click(function() {
                    // hide fahrenheit temp
                    $("#tempf").css("display", "none")
                    // disable celcius option
                    $(this).addClass("disabled");
                    // display celcius temp
                    $("#tempc").css("display", "inline");
                    // make other option available
                    $("#f").removeClass("disabled");
                    // update wind speed
                    $("#wind").text(`Wind: ${(wData.wind.speed*3.6).toFixed(2)} km/h`);
                });
            });
        });
    });
});