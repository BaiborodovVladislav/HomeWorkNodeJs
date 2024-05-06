const readline = require('readline');

const r1 = readline.createInterface({
	input: process.stdin, // v vod s klavbi 
	output: process.stdout // vbivod ne ispolzuets9(
});

function getRandomNumber(max, min) {
	return Math.floor(Math.random() * (max - min + 1) + min); // chisla random chtobbi v diapozone
}

function GameVer() {   // osnova igroka
	const secretNumber = getRandomNumber(100, 0);
	let maxNumber = 100;
	let minNumber = 0;
	console.log(`Загадано число в диапазоне от ${minNumber} до ${maxNumber}`);


	function askQuestion() {   // jdet vvoda dl9 podskazki
		r1.question('Ваш вариант: ', (input) => {
			const guess = parseInt(input); // vvod

			if (isNaN(guess)) {
				console.log('Вы ввели не число'); // ne chislo
				askQuestion();
			} else {
				if (guess === secretNumber) { // pobeda sovpali chisla vvoda i zagadanoe
					console.log(`vin ${secretNumber}`)
					r1.close()
				} else if (guess < secretNumber) { // chislo vvoda < zagadanogo
					minNumber = guess
					console.log(`Больше`)
					console.log(`Число находится в диапазоне от ${minNumber} до ${maxNumber}`)
					askQuestion()
				} else {
					maxNumber = guess
					console.log(`Число находится в диапазоне от ${minNumber} до ${maxNumber}`)
					console.log(`Меньше`)
					askQuestion()
				}
			}
		});
	}
	askQuestion()
}

GameVer()