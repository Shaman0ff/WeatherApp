const apiKey = 'd664a4fa3cb830cbe01613a5d790d94d';
const cityInput = document.getElementById('city-input');
const weatherBtn = document.getElementById('get-weather-btn');
const weatherResult = document.getElementById('weather-result');
const cityNameEl = document.getElementById('city-name');

weatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Введите название города');
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
        } else {
            alert('Город не найден');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка подключения');
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherResult.innerHTML = `
        <img src="${iconUrl}" alt="Погода" class="weather-icon">
        <div class="temp">${temp}°</div>
        <div class="desc">${description}</div>
    `;

    cityNameEl.textContent = name;
    weatherResult.classList.add('visible');
}
