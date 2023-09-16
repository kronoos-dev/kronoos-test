const fs = require('fs');
const csv = require('csv-parser')
// const parser = require('csv-parse');

exports.processCSV = async (data) => {
    // fs.createReadStream('data.csv')
    //     .pipe(csv())
    //     .on('data', (data) => records.push(data))
    //     .on('end', () => {
    //         console.log(results);
    //         // [
    //         //   { NAME: 'Daffy Duck', AGE: '24' },
    //         //   { NAME: 'Bugs Bunny', AGE: '22' }
    //         // ]
    //     });

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

    await (async () => {
        const records = await processFile();
        console.info(records);
    })();
};