const apiKey = 'd664a4fa3cb830cbe01613a5d790d94d';
const cityInput = document.getElementById('city-input');
const weatherBtn = document.getElementById('get-weather-btn');
const weatherResult = document.getElementById('weather-result');

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

    weatherResult.innerHTML = `
        <h2>${name}</h2>
        <p class="temp">${temp}°C</p>
        <p class="desc">${description}</p>
    `;
    weatherResult.style.display = 'block';
}
