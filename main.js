const apiKey = "d20f547591cfc7ba285d0e12bc3d682c";

async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please, enter the name of the city or state");
        return;
    }

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();

        if (res.ok) {
            document.getElementById("cityName").innerText = `🌍 ${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").innerText = `🌡 ${Math.round(data.main.temp)}°C`;
            document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("windSpeed").innerText = `🌬 Wind Speed: ${data.wind.speed} m/s`;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            change(data.weather[0].main.toLowerCase());
        } else {
            document.getElementById("weather-info").innerHTML = `<p style="color: red;">❌ The weather isn't found! Please try again.</p>`;
        }
    } catch (error) {
        console.log("Error", error);
    }
}

function change(sys){
    const body = document.body;

    if(sys.includes("clear")){
        body.style.background = "linear-gradient(135deg, #ffd700)";
    } else if(sys.includes("clouds")){
        body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    } else if(sys.includes("rain")){
        body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
    } else if(sys.includes("snow")){
        body.style.background = "linear-gradient(135deg, #e6f0ff, #ffffff)";
    }
}

function showDate(){
    const today = new Date();
    const dateString = today.toLocaleDateString("uz-UZ");
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const name = week[today.getDay()];

    document.getElementById("currentDate").innerText = `${name}, ${dateString}`;
}

showDate();