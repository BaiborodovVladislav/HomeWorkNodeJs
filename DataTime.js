const yargs = require('yargs'); // biblioteka

yargs
	.command('current', 'Get current date and time', (yargs) => {
		yargs
			.option('Year', {  // vvbivod datbi po komande current
				describe: 'Year',
				alias: 'y',
				type: 'boolean',
			})
			.option('Month', {
				describe: 'Month',
				alias: 'm',
				type: 'boolean',
			})
			.option('Day', {
				describe: 'Day',
				alias: 'd',
				type: 'boolean',
			});
	}, (argv) => {
		if (argv.Year) { // vvbivod datbi po komandam
			console.log(new Date().getFullYear());
		} else if (argv.Month) {
			console.log(new Date().getMonth() + 1);
		} else if (argv.Day) {
			console.log(new Date().getDate());
		} else {
			console.log(new Date().toISOString());
		}
	})
	.command('add', 'Add time', (yargs) => { // add time to date and month
		yargs
			.option('month', {
				describe: 'Month',
				alias: 'm',
				type: 'number',
			})
			.option('day', {
				describe: 'Day',
				alias: 'd',
				type: 'number',
			});
	}, (argv) => {
		const currentDate = new Date();
		const { month = 0, day = 0 } = argv;
		currentDate.setMonth(currentDate.getMonth() + month);
		currentDate.setDate(currentDate.getDate() + day);
		console.log(currentDate.toISOString());
	})
	.command('sub', 'Subtract time', (yargs) => { // sub time from date and month
		yargs
			.option('month', {
				describe: 'Month',
				alias: 'm',
				type: 'number',
			})
			.option('day', {
				describe: 'Day',
				alias: 'd',
				type: 'number',
			});
	}, (argv) => {
		const currentDate = new Date();
		const { month = 0, day = 0 } = argv;
		currentDate.setMonth(currentDate.getMonth() - month);
		currentDate.setDate(currentDate.getDate() - day);
		console.log(currentDate.toISOString());
	})
	.help()
	.argv;
