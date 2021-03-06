const lang = "en"
var lat_lon = "21.14603996377535,106.073258917024"
var api = "d61d56e7025c803083cb4e4d4513d1a3"
async function launch() {
    await weather();
    $done();
}

launch()

function weather() {
    let info = {
        url: "https://api.darksky.net/forecast/" + api + "/" + lat_lon + "?lang=" + lang + "&units=si&exclude=currently,minutely",  //?lang=en&units=si
        headers: {},
    }
    $httpClient.get(info, async function (error, response, data) {
        if (error) {
            console.log(error);
            $notification.post("Dark Sky", lat_lon + 'bad connection', error);
        } else {
            var obj = JSON.parse(data);
            console.log(obj);
            var hour_summary = obj.hourly.summary;
            var icon_text = obj.hourly.icon;
            var icon = "β"
            if (icon_text == "clear-day") icon = "βοΈ";
            if (icon_text == "partly-cloudy-day") icon = "π€";
            if (icon_text == "cloudy") icon = "βοΈ";
            if (icon_text == "rain") icon = "π§";
            if (icon_text == "snow") icon = "βοΈ";
            if (icon_text == "sleet") icon = "π¨";
            if (icon_text == "wind") icon = "π¬";
            if (icon_text == "fog") icon = "π«";
            if (icon_text == "partly-cloudy-night") icon = "π";
            if (icon_text == "clear-night") icon = "π";
            var daily_prec_chance = obj.daily.data[0].precipProbability;
            var daily_maxtemp = obj.daily.data[0].temperatureMax;
            var daily_mintemp = obj.daily.data[0].temperatureMin;
            $notification.post("Tp. BαΊ―c Ninh", icon + " " +Math.round(daily_mintemp) + " - " + Math.round(daily_maxtemp) + "  βοΈ " + (Number(daily_prec_chance) * 100).toFixed(1)+ "%", hour_summary);        }
    });
}
