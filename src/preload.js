document.getElementById("yourButtonID").addEventListener("click", buttonClicked);

function buttonClicked() {
    var city = document.getElementById("city_input").value;

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=32804b24a847407391c53709241010&q=${city}&days=3`)
        .then((response) => response.json())
        .then((data) => {
            var info = data;

            // Displaying data on the HTML page for current location
            document.getElementById("location").textContent = info.location.name;
            document.getElementById("region").textContent = info.location.region;
            document.getElementById("country").textContent = info.location.country;
            document.getElementById("localtime").textContent = info.location.localtime;
            document.getElementById("temperature").textContent = info.current.temp_c + "°C";
            document.getElementById("feelstemperature").textContent = info.current.temp_f + "°C";
            document.getElementById("sunrise").textContent = info.forecast.forecastday[0].astro.sunrise;
            document.getElementById("sunset").textContent = info.forecast.forecastday[0].astro.sunset;

            var iconUrl = "https:" + info.current.condition.icon;
            document.getElementById("icon").src = iconUrl;
            document.getElementById("description").textContent = info.current.condition.text;

            // Displaying 3-day forecast data
            for (let i = 0; i < 3; i++) {
                document.getElementById(`day${i+1}_max`).textContent = info.forecast.forecastday[i].day.maxtemp_c + "°C";
                document.getElementById(`day${i+1}_wind`).textContent = info.forecast.forecastday[i].day.maxwind_kph + " kph";
                document.getElementById(`day${i+1}_humidity`).textContent = info.forecast.forecastday[i].day.avghumidity + "%";
                document.getElementById(`day${i+1}_description`).textContent = info.forecast.forecastday[i].day.condition.text;
            }

            // Hide all season tips by default
            document.getElementById("summerOutfitTips").style.display = "none";
            document.getElementById("autumnOutfitTips").style.display = "none";
            document.getElementById("winterOutfitTips").style.display = "none";
            document.getElementById("springOutfitTips").style.display = "none";

            // Check temperature and display appropriate season tips
            if (info.current.temp_c >= 30) {
                document.getElementById("summerOutfitTips").style.display = "block";
            } else if (info.current.temp_c >= 10 && info.current.temp_c < 20) {
                document.getElementById("autumnOutfitTips").style.display = "block";
            } else if (info.current.temp_c >= 20 && info.current.temp_c < 30) {
                document.getElementById("springOutfitTips").style.display = "block";
            } else if (info.current.temp_c <= 10) {
                document.getElementById("winterOutfitTips").style.display = "block";
            }
        })
        .catch((error) => console.error('Error fetching the data:', error));
}
