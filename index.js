import express from "express";
import cors from 'cors';
import fs from 'fs';
import parse from 'csv-parser';
import utils from './utils/index.js';

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.get('/csv-converter', async (req, res) => {
    try {
        const objArray = [];
        fs.createReadStream("./data.csv")
            .pipe(parse({
                delimiter: ",",
                from_line: 2
            }))
            .on("data", function (row) {
                row.validTotalPrestacoes = utils.validTotalPrestacoes(row?.vlTotal, row?.qtPrestacoes, row?.vlPresta);
                row = utils.convertToCurrency(row);
                row.validCpfCnpj = utils.checkCPFCNPJ(row?.nrCpfCnpj);
                row.dtContrato = utils.strToDate(row?.dtContrato);
                row.dtVctPre = utils.strToDate(row?.dtVctPre);
                objArray.push(row);
            })
            .on("error", function (error) {
                res.status(500).json({
                    message: error.message
                });
            })
            .on("end", function () {
                res.send(JSON.stringify(objArray));
            });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

const port = process.env.PORT || "4000";

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});