const fs = require("fs");
const csv = require("csv-parser");

const readData = async (dataPath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(dataPath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                resolve(results);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
};

module.exports = readData;
