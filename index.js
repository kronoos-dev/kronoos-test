import * as fs from 'fs';
import csv from 'csv-parser'
import intl  from 'intl'

const parseCSV = (filePath) => {
    return new Promise((res,rej)=>{
        const csvData= [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data)=> {
            csvData.push(data)
        })
        .on('end', ()=>{
            res(csvData)
        })
        .on('error', (err)=>{
            rej(err)
        })
    })
}


const main = async () => {
    const filePath = './data.csv'
    const csvData = await parseCSV(filePath);
    console.log(csvData.length)
    
}

main()