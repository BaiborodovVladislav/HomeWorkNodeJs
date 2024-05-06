const readline = require('readline');
const path = require('path');
const fs = require('fs');

const r1 = readline.createInterface({
	input: process.stdin, // ввод с клавиатуры
	output: process.stdout // вывод в консоль
});

function moneyThrow() { // функция подброса монеты
	return Math.random() < 0.5 ? 1 : 2;
}

function logResult(fileName, result) {
	const filePath = path.join(process.cwd(), fileName); // путь к файлу лога
	const logEntry = new Date().toLocaleString() + ' ' + result + '\n'; // строка для файла лога

	fs.appendFile(filePath, logEntry, (err) => {
		if (err) throw Error(err); // добавление в файл лога
		console.log('Результаты игры записаны в файл:', fileName);
	});
}

function startGame(fileName) {
	r1.question('Угадайте, что выпадет: 1 (орёл) или 2 (решка)?', (answer) => {

		const guess = parseInt(answer);

		if (guess !== 1 && guess !== 2) {
			console.log('Вы ввели некорректный вариант');
			return startGame(fileName);
		}

		const result = moneyThrow();

		if (result === 1) console.log('Монетка показала: орёл');
		else console.log('Монетка показала: решка');

		if (guess === result) {
			console.log('Вы выиграли!');
			logResult(fileName, 'орёл');
		} else {
			console.log('Вы проиграли!');
			logResult(fileName, 'решка');
		}

		r1.close();
	});
}

const fileNameTwo = process.argv[2];

if (!fileNameTwo) {
	console.error('Ошибка: Пожалуйста, укажите имя файла для логирования результатов.');
	process.exit(1);
}

startGame(fileName);


function analyzeGameLogs(filePath) {
	fs.readFile(filePath, 'utf8', (err, data) => {
		if (err) {
			console.error('Ошибка при чтении файла:', err);
			return;
		}

		const lines = data.trim().split('\n');
		const totalGames = lines.length;
		let wins = 0;
		let losses = 0;

		lines.forEach(line => {
			const result = line.split(' ')[1];
			if (result === 'выиграли!') {
				wins++;
			} else {
				losses++;
			}
		});

		const winPercentage = (wins / totalGames) * 100;

		console.log('Общее количество партий:', totalGames);
		console.log('Количество выигранных партий:', wins);
		console.log('Количество проигранных партий:', losses);
		console.log('Процентное соотношение выигранных партий:', winPercentage.toFixed(2) + '%');
	});
}

const fileName = process.argv[2];

if (!fileName) {
	console.error('Ошибка: Пожалуйста, укажите имя файла для логирования результатов.');
	process.exit(1);
}

const command = process.argv[3];

if (command === 'play') {
	startGame(fileName);
} else if (command === 'analyze') {
	analyzeGameLogs(fileName);
} else {
	console.error('Ошибка: Необходимо указать команду "play" для запуска игры или "analyze" для анализа логов.');
	process.exit(1);
}