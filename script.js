const inputBox = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.getElementById('weather-img');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const locationNotFound = document.getElementById('lnf');
const weatherContainer = document.getElementById('weather-container');


async function checkWeather(city) {
    const API_Key = '65b0dd1c084d17575f5ca2072ff63ca2';
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;

    const weather_data = await fetch(`${URL}`)
        .then(responce => responce.json())
        .catch(function(error) {
            console.error('Error fetching weather data:', error);
        });

    if(weather_data.cod === '404'){
        inputBox.value='';
        locationNotFound.style.display='flex';
        weatherContainer.style.display='none';
        console.error('Error fetching weather data:', error);
        return;
    }

    weatherContainer.style.display='flex';
    locationNotFound.style.display='none';
    let temp_Degree = `${Math.round(weather_data.main.temp - 273.15)}`
    
    temperature.innerHTML = `${temp_Degree}<sup>°C</sup>`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png";
            break;
        default :
            weatherImg.src = "/assets/404.png";
            break;
    }
}


searchBtn.addEventListener( 'click', () => {
    checkWeather(inputBox.value);
 });