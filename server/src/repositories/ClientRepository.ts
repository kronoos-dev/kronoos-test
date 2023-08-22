import fs from "node:fs";
import { parse as cvsParse } from "csv-parse";

import { Client } from "../model/Client";
import { maskCPFourCNPJ } from "../utils/masks/cpf_cnpj";
import { maskCOIN_BRL } from "../utils/masks/coinBRL";
import { maskDatetime } from "../utils/masks/datetime";
import { validateCPFourCNPJ } from "../utils/masks/validateDocument";

interface ICreateClientDTO {
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: number;
  nrContrato: number;
  dtContrato: number;
  qtPrestacoes: number;
  vlTotal: number;
  cdProduto: number;
  dsProduto: string;
  cdCarteira: number;
  dsCarteira: string;
  nrProposta: number;
  nrPresta: number;
  tpPresta: string;
  nrSeqPre: number;
  dtVctPre: number;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: number;
  vlIof: number;
  vlDescon: number;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
};

class ClientRepository {
  private clients: Client[];

  constructor() {
    this.clients = [];
  }

  create(data: ICreateClientDTO): void {
    const client = new Client();

    Object.assign(client, data);
  
    this.clients.push(client);
  }

  import(file: Express.Multer.File): Promise<Client[]> {
    let isFlagLine = true;

    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(file.path);

        const parseFile = cvsParse();
        stream.pipe(parseFile);

        parseFile
          .on("data", async (line) => {
            if (isFlagLine) {
              isFlagLine = false;
              return;
            }

            if (line.length === 27) {
              const client: Client = {
                nrInst: Number(line[0]),
                nrAgencia: Number(line[1]),
                cdClient: Number(line[2]),
                nmClient: line[3],
                nrCpfCnpj: maskCPFourCNPJ(line[4]),
                isCPFourCNPJvalidate: validateCPFourCNPJ(line[4]),
                
                nrContrato: Number(line[5]),
                dtContrato: maskDatetime(line[6]),
                qtPrestacoes: Number(line[7]),
                vlTotal: maskCOIN_BRL(line[8]),
                cdProduto: Number(line[9]),
                dsProduto: line[10],
                cdCarteira: Number(line[11]),
                dsCarteira: line[12],
                nrProposta: Number(line[13]),
                nrPresta: Number(line[14]),
                tpPresta: line[15],
                nrSeqPre: Number(line[16]),
                dtVctPre: maskDatetime(line[17]),
                vlPresta: maskCOIN_BRL(line[18]),
                vlMora: maskCOIN_BRL(line[19]),
                vlMulta: maskCOIN_BRL(line[20]),
                vlOutAcr: maskCOIN_BRL(line[21]),
                vlIof: maskCOIN_BRL(line[22]),
                vlDescon: maskCOIN_BRL(line[23]),
                vlAtual: maskCOIN_BRL(line[24]),
                idSituac: line[25],
                idSitVen: line[26],
              };

              this.clients.push(client);
            }
          })
          .on("end", () => {
              fs.promises.unlink(file.path);
              resolve(this.clients);
          })
          .on("error", (err) => {
              reject(err);
          });
    });
  }

  list(): Client[] {
    return this.clients;
  }
}

export { ClientRepository };