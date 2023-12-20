import sqlite3 from "sqlite3";
import { Database } from "./database";
import { Data } from "../model/Data";

export class SqliteDatabase implements Database {
  private static instance: SqliteDatabase;
  private dbConnection: sqlite3.Database;

  private constructor(dbConnection: sqlite3.Database) {
    this.dbConnection = dbConnection;
  }

  public static async getInstance(): Promise<SqliteDatabase> {
    if (!SqliteDatabase.instance) {
      const dbConnection = await this.initDb();
      SqliteDatabase.instance = new SqliteDatabase(dbConnection);
    }
    return SqliteDatabase.instance;
  }

  private static initDb(): Promise<sqlite3.Database> {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(":memory:", (err) => {
        if (err) {
          reject(err);
        }
        this.createTable(db).then(() => {
          resolve(db);
        });
      });
    });
  }

  private static createTable(db: sqlite3.Database): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        `
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
      )`,
        (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        },
      );
    });
  }

  public getData(params: {
    page: number;
    pageSize: number;
    orderBy: string;
    order: "ASC" | "DESC";
  }): Promise<{ rows: Data[]; pageCount: number }> {
    return new Promise((resolve, reject) => {
      const result = {
        rows: [] as Data[],
        pageCount: 0,
      };
      const { page, pageSize, orderBy, order } = params;
      const offset = (page - 1) * pageSize;
      const query = `SELECT * FROM data ORDER BY ${orderBy} ${order} LIMIT ${pageSize} OFFSET ${offset}`;

      this.dbConnection.all(query, (err, rows) => {
        if (err) {
          reject(err);
        }
        result.rows = rows as Data[];
      });

      this.dbConnection.get("SELECT COUNT(*) FROM data", (err, count) => {
        if (err) {
          reject(err);
        }
        result.pageCount = Math.ceil(
          ((count as any)["COUNT(*)"] as number) / pageSize,
        );
        resolve(result);
      });
    });
  }

  public insertData(data: Data): Promise<void> {
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
