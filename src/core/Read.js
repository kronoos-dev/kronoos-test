import fs from "fs";
import csv from "csv-parser";

import ToBRL from "../masks/ToBRL.mask.js";
import Cnpj from "../validators/Cnpj.validator.js";
import Cpf from "../validators/Cpf.validator.js";
import DueAmount from "../calcs/DueAmount.calc.js";
import ToDate from "../masks/ToDate.mask.js";
import InstallmentValue from "../validators/InstallmentValue.validator.js";

class Read {
    constructor(filePath) {
        this.filePath = filePath;
        this.readable = fs.createReadStream(this.filePath);
        this.readable.on("error", (err) => {
            console.error("Error to read the CSV file:", err);
            return;
        });
        this.init();
    }

    validateNrCpfCnpjField(nrCpfCnpj) {
        return new Cpf(nrCpfCnpj).isValid()
            ? true
            : new Cnpj(nrCpfCnpj).isValid();
    }
    validateVlPrestaField(vlPresta, vlTotal, qtPrestacoes) {
        return new InstallmentValue(
            vlPresta,
            new DueAmount(vlTotal, qtPrestacoes)
        ).isValid();
    }

    updateFields(row) {
        const validNrCpfCnpj = this.validateNrCpfCnpjField(row.nrCpfCnpj);
        const validVlPresta = this.validateVlPrestaField(
            row.vlPresta,
            row.vlTotal,
            row.qtPrestacoes
        );

        row.dtContrato = new ToDate(row.dtContrato).transform();
        row.dtVctPre = new ToDate(row.dtVctPre).transform();

        row.vlTotal = new ToBRL(row.vlTotal).transform();
        row.vlPresta = new ToBRL(row.vlPresta).transform();
        row.vlMora = new ToBRL(row.vlMora).transform();
        row.vlMulta = new ToBRL(row.vlMulta).transform();
        row.vlOutAcr = new ToBRL(row.vlOutAcr).transform();
        row.vlIof = new ToBRL(row.vlIof).transform();
        row.vlDescon = new ToBRL(row.vlDescon).transform();
        row.vlAtual = new ToBRL(row.vlAtual).transform();

        row = { ...row, validNrCpfCnpj, validVlPresta };

        return row;
    }

    init() {
        this.readable
            .pipe(csv())
            .on("data", (row) => {
                row = this.updateFields(row);
            })
            .on("end", () => {
                console.log("-End of file-");
            });
    }
}

export default Read;
