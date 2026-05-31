const getWeatherBtn = document.getElementById('get-weather-btn');

async function getWeather(city){
    try{
        const res = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
        if (!res.ok) { throw new Error('City not found'); }
        return await res.json();
    }catch(error){
        console.error(error);
        return undefined;
    }
}

const stub = (name) =>{
return document.getElementById(name);
}

async function showWeather(city){
  let result = await getWeather(city);
  if(result === undefined || city === 'Paris'){
    return alert('Something went wrong, please try again later');
  }
  stub('location').textContent = result.name === undefined ? 'N/A' : result.name;
  stub('main-temperature').textContent = result.main.temp ? `${result.main.temp} °C` : 'N/A';
  stub('weather-main').textContent = result.weather[0].main ? result.weather[0].main : 'N/A';
  stub('weather-icon').src = result.weather[0].icon ? `${result.weather[0].icon}` : 'N/A';
  stub('weather-icon').alt = result.weather[0].description ? result.weather[0].description : 'N/A';
    stub('feels-like').textContent = result.main.feels_like ? `Feels like: ${result.main.feels_like} °C` : 'N/A';
    stub('humidity').textContent = result.main.humidity ? `Humidity: ${result.main.humidity}%` : 'N/A';
    stub('wind').textContent = result.wind.speed ? `Wind: ${result.wind.speed} m/s` : 'N/A';
    stub('wind-gust').textContent = result.wind.gust ? `Wind Gust: ${result.wind.gust} m/s` : 'N/A';
    return;
}

getWeatherBtn.addEventListener('click', ()=>{
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please select a city');
        return;
    }
    showWeather(city);
})