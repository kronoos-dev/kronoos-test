import sqlite3 from "sqlite3";
import { Database } from "./database";
import { Data } from "../model/Data";

export class SqliteDatabase implements Database {
  dbConnection: sqlite3.Database;

  constructor() {
    this.dbConnection = this.initDb();
  }

  initDb() {
    const db = new sqlite3.Database(":memory:");
    db.run(`
      CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cdCarteira INTEGER,
        cdClient INTEGER,
        cdProduto INTEGER,
        dsCarteira TEXT,
        dsProduto TEXT,
        dtContrato INTEGER,
        dtVctPre INTEGER,
        idSitVen TEXT,
        idSituac TEXT,
        nmClient TEXT,
        nrAgencia INTEGER,
        nrContrato INTEGER,
        nrCpfCnpj INTEGER,
        nrInst INTEGER,
        nrPresta INTEGER,
        nrProposta INTEGER,
        nrSeqPre INTEGER,
        qtPrestacoes INTEGER,
        tpPresta TEXT,
        vlAtual REAL,
        vlDescon REAL,
        vlIof REAL,
        vlMora REAL,
        vlMulta REAL,
        vlOutAcr REAL,
        vlPresta REAL,
        vlTotal REAL
      )
    `);

    return db;
  }

  getData(): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      this.dbConnection.all("SELECT * FROM data", (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows as Data[]);
      });
    });
  }
  insertData(data: Data): Promise<void> {
    return new Promise((resolve, reject) => {
      this.dbConnection.run(
        `INSERT INTO data (
          cdCarteira,
          cdClient,
          cdProduto,
          dsCarteira,
          dsProduto,
          dtContrato,
          dtVctPre,
          idSitVen,
          idSituac,
          nmClient,
          nrAgencia,
          nrContrato,
          nrCpfCnpj,
          nrInst,
          nrPresta,
          nrProposta,
          nrSeqPre,
          qtPrestacoes,
          tpPresta,
          vlAtual,
          vlDescon,
          vlIof,
          vlMora,
          vlMulta,
          vlOutAcr,
          vlPresta,
          vlTotal
        ) VALUES (
          $cdCarteira,
          $cdClient,
          $cdProduto,
          $dsCarteira,
          $dsProduto,
          $dtContrato,
          $dtVctPre,
          $idSitVen,
          $idSituac,
          $nmClient,
          $nrAgencia,
          $nrContrato,
          $nrCpfCnpj,
          $nrInst,
          $nrPresta,
          $nrProposta,
          $nrSeqPre,
          $qtPrestacoes,
          $tpPresta,
          $vlAtual,
          $vlDescon,
          $vlIof,
          $vlMora,
          $vlMulta,
          $vlOutAcr,
          $vlPresta,
          $vlTotal
        )`,
        {
          $cdCarteira: data.cdCarteira,
          $cdClient: data.cdClient,
          $cdProduto: data.cdProduto,
          $dsCarteira: data.dsCarteira,
          $dsProduto: data.dsProduto,
          $dtContrato: data.dtContrato,
          $dtVctPre: data.dtVctPre,
          $idSitVen: data.idSitVen,
          $idSituac: data.idSituac,
          $nmClient: data.nmClient,
          $nrAgencia: data.nrAgencia,
          $nrContrato: data.nrContrato,
          $nrCpfCnpj: data.nrCpfCnpj,
          $nrInst: data.nrInst,
          $nrPresta: data.nrPresta,
          $nrProposta: data.nrProposta,
          $nrSeqPre: data.nrSeqPre,
          $qtPrestacoes: data.qtPrestacoes,
          $tpPresta: data.tpPresta,
          $vlAtual: data.vlAtual,
          $vlDescon: data.vlDescon,
          $vlIof: data.vlIof,
          $vlMora: data.vlMora,
          $vlMulta: data.vlMulta,
          $vlOutAcr: data.vlOutAcr,
          $vlPresta: data.vlPresta,
          $vlTotal: data.vlTotal,
        },
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        },
      );
    });
  }
}
