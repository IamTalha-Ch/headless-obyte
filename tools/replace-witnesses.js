/*jslint node: true */
'use strict';
const db = require('ocore/db.js');

let witnesses = [];
if (!process.env.testnet) {
	witnesses.push({'old': 'JEDZYC2HMGDBIDQKG3XSTXUSHMCBK725', 'new': '4GDZSXHEFVFMHCUCSHZVXBVF5T2LJHMU'}); // Rogier Eijkelhof
	witnesses.push({'old': 'S7N5FE42F6ONPNDQLCF64E2MGFYKQR2I', 'new': 'FAB6TH7IRAVHDLK2AAWY5YBE6CEBUACF'}); // Fabien Marino
	witnesses.push({'old': 'DJMMI5JYA5BWQYSXDPRZJVLW3UGL3GJS', 'new': '2TO6NYBGX3NF5QS24MQLFR7KXYAMCIE5'}); // Bosch Connectory Stuttgart
	witnesses.push({'old': 'OYW2XTDKSNKGSEZ27LMGNOPJSYIXHBHC', 'new': 'APABTE2IBKOIHLS2UNK6SAR4T5WRGH2J'}); // PolloPollo
	witnesses.push({'old': 'BVVJ2K7ENPZZ3VYZFWQWK7ISPCATFIW3', 'new': 'DXYWHSZ72ZDNDZ7WYZXKWBBH425C6WZN'}); // Bind Creative
}

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

async function replace_witnesses() {
	await asyncForEach(witnesses, async function(replacement) {
		if (replacement.old && replacement.new) {
			let result = await db.query("UPDATE my_witnesses SET address = ? WHERE address = ?;", [replacement.new, replacement.old]);
			console.log(result);
		}
	});
	db.close(function() {
		console.log('===== done');
		process.exit();
	});
}
replace_witnesses();