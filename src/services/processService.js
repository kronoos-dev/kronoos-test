const fs = require('fs');
const csv = require('csv-parser')

exports.processCSV = async (data) => {
    try {
        // console.log(data.params)
        const processFile = async () => {
            const records = [];
            const parser = fs
                .createReadStream('data.csv')
                .pipe(csv({
                    // CSV options if any
                }));
            for await (const record of parser) {
                // Work with each record
                records.push(record);
            }
            return records;
        };

        return await (async () => {
            return await processFile();
        })();
    } catch (err) {
        console.log(err);
    }
};