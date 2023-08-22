import * as fs from 'fs';
import csv from 'csv-parser'
import Intl  from 'intl'

const fomatBRL = (currencyValue) =>{
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currencyValue)
}

const parseCSV = (filePath) => {
    return new Promise((res,rej)=>{
        const csvData= [];
        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data)=> {
            const formattedData = {
                ...data,
                vlTotal: fomatBRL(data.vlTotal),
                vlPresta: fomatBRL(data.vlPresta),
                vlMora: fomatBRL(data.vlMora),
                vlMulta: fomatBRL(data.vlMulta),
                vlAtual: fomatBRL(data.vlAtual),
            } 
            csvData.push(formattedData);
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
    console.log(csvData[0])
    
}

main()