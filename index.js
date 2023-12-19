const csv = require('csv-parser');
const fs = require('fs');

const run = (file = 'data.csv') => {
	const results = [];
	const resultFilePath = './result.json';
	console.log(`Started processing of ${file}...`);
	fs.createReadStream(file)
		.pipe(csv())
		.on('data', (data) => {
			results.push({ ...data });
		})
		.on('end', () => {
			console.log(`Finished processing ${results.length} rows. Saving JSON to file...`);
			fs.writeFileSync(resultFilePath, JSON.stringify(results, null, 2));
			console.log(`Finished processing ${file} saved JSON array to ${resultFilePath}`);
		});
};

run();
