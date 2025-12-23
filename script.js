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
    const { name, main, weather, sys } = data;
    const temp = Math.round(main.temp);
    const description = weather[0].description;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // --- Определяем тип погоды ---
    const weatherMain = weather[0].main.toLowerCase();
    let weatherClass = 'clear'; // по умолчанию — солнечно

    if (weatherMain.includes('cloud')) {
        weatherClass = 'clouds';
    } else if (weatherMain.includes('rain')) {
        weatherClass = 'rain';
    } else if (weatherMain.includes('drizzle')) {
        weatherClass = 'drizzle';
    } else if (weatherMain.includes('thunderstorm')) {
        weatherClass = 'thunderstorm';
    } else if (weatherMain.includes('snow')) {
        weatherClass = 'snow';
    }

    // --- Проверяем, ночь ли сейчас ---
    const now = new Date().getTime() / 1000; // текущее время в секундах
    const isNight = now < sys.sunrise || now > sys.sunset;

    // Убираем старые классы погоды
    document.body.className = '';

    // Добавляем класс погоды
    document.body.classList.add(weatherClass);

    // Если ночь — добавляем "night" поверх
    if (isNight) {
        document.body.classList.add('night');
    }

    // --- Обновляем содержимое ---
    weatherResult.innerHTML = `
        <img src="${iconUrl}" alt="Погода" class="weather-icon">
        <div class="temp">${temp}°</div>
        <div class="desc">${description}</div>
    `;

    cityNameEl.textContent = name;
    weatherResult.classList.add('visible');
}
