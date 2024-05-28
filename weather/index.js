// Подключаем нужные модули и файлы
require('dotenv').config(); // Загружаем переменные окружения из файла .env
const https = require('https'); // Подключаем модуль для работы с HTTPS запросами
const config = require('./config'); // Подключаем файл конфигурации

// Функция для получения координат города
const getCoordinates = (city, callback) => {
	const apiKey = config.API_KEY; // Получаем API ключ из конфигурации
	// Формируем URL для запроса к API, чтобы получить координаты города
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

	https.get(url, (res) => {
		let data = '';

		// Когда приходят данные от сервера, добавляем их к переменной data
		res.on('data', (chunk) => {
			data += chunk;
		});

		// Когда все данные пришли, парсим их и берем координаты
		res.on('end', () => {
			const location = JSON.parse(data)[0]; // Преобразуем данные из JSON формата в объект и берем первый элемент
			if (location) {
				callback(null, location.lat, location.lon); // Если город найден, вызываем callback с координатами
			} else {
				callback(new Error('City not found'), null); // Если город не найден, возвращаем ошибку
			}
		});
	}).on('error', (err) => {
		callback(err, null); // Если произошла ошибка при запросе, возвращаем ошибку
	});
};

// Функция для получения погоды по координатам
const getWeather = (lat, lon) => {
	const apiKey = config.API_KEY; // Получаем API ключ из конфигурации
	// Формируем URL для запроса к API, чтобы получить данные о погоде
	const url = `${config.BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

	https.get(url, (res) => {
		let data = '';

		// Когда приходят данные от сервера, добавляем их к переменной data
		res.on('data', (chunk) => {
			data += chunk;
		});

		// Когда все данные пришли, парсим их и выводим погоду
		res.on('end', () => {
			const weatherData = JSON.parse(data); // Преобразуем данные из JSON формата в объект
			if (weatherData.cod === 200) {
				console.log(`Current Weather in ${weatherData.name}:`); // Выводим название города
				console.log(`Temperature: ${weatherData.main.temp}°C`); // Выводим температуру
				console.log(`Weather: ${weatherData.weather[0].description}`); // Выводим описание погоды
			} else {
				console.error('Error fetching current weather:', weatherData.message); // Если произошла ошибка, выводим сообщение об ошибке
			}
		});
	}).on('error', (err) => {
		console.error('Error fetching weather data:', err.message); // Если произошла ошибка при запросе, выводим сообщение об ошибке
	});
};

// Получаем название города из аргументов командной строки
const city = process.argv[2];

if (!city) {
	console.error('Please provide a city name'); // Если город не указан, выводим ошибку и прекращаем выполнение
	process.exit(1);
}

// Получаем координаты города и затем погоду по этим координатам
getCoordinates(city, (err, lat, lon) => {
	if (err) {
		console.error(err.message); // Если произошла ошибка при получении координат, выводим сообщение об ошибке
	} else {
		getWeather(lat, lon); // Если координаты получены успешно, получаем погоду по этим координатам
	}
});
