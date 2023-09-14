import { RowDataPacket } from "mysql2";
import { dbPool } from "../config/database";

export const updateCSVData = async (nrInst: string, nrAgencia: string, cdClient: string, nrContrato: string, updatedData: any) => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("UPDATE csv SET ? WHERE nrInst = ? AND nrAgencia = ? AND cdClient = ? AND nrContrato = ?", [updatedData, nrInst, nrAgencia, cdClient, nrContrato]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteCSVData = async (id: number) => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("DELETE FROM csv WHERE id = ?", [id]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getAllCSVData = async (): Promise<any[]> => {
  const connection = await dbPool.getConnection();

  try {
    const [rows] = await connection.query("SELECT * FROM csv");

    if (Array.isArray(rows)) {
      // Se rows for um array, mapeie os resultados
      const data = rows.map((row: any) => ({
        nrInst: row.nrInst,
        nrAgencia: row.nrAgencia,
        cdClient: row.cdClient,
        nmClient: row.nmClient,
        nrCpfCnpj: row.nrCpfCnpj,
        nrContrato: row.nrContrato,
        dtContrato: row.dtContrato,
        qtPrestacoes: row.qtPrestacoes,
        vlTotal: row.vlTotal,
        cdProduto: row.cdProduto,
        dsProduto: row.dsProduto,
        cdCarteira: row.cdCarteira,
        dsCarteira: row.dsCarteira,
        nrProposta: row.nrProposta,
        nrPresta: row.nrPresta,
        tpPresta: row.tpPresta,
        nrSeqPre: row.nrSeqPre,
        dtVctPre: row.dtVctPre,
        vlPresta: row.vlPresta,
        vlMora: row.vlMora,
        vlMulta: row.vlMulta,
        vlOutAcr: row.vlOutAcr,
        vlIof: row.vlIof,
        vlDescon: row.vlDescon,
        vlAtual: row.vlAtual,
        idSituac: row.idSituac,
        idSitVen: row.idSitVen,
      }));

      return data;
    } else {
      // Se rows for um objeto (confirmação), retorne um array vazio
      return [];
    }
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const getCSVDataByPrimaryKeys = async (nrInst: string, nrAgencia: string, cdClient: string, nrContrato: string) => {
  const connection = await dbPool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM csv WHERE nrInst = ? AND nrAgencia = ? AND cdClient = ? AND nrContrato = ?", [nrInst, nrAgencia, cdClient, nrContrato]);

    if (rows.length > 0) {
      return rows[0]; // Retorna a primeira linha correspondente
    } else {
      return null; // Retorna null se não encontrar nenhuma correspondência
    }
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
export const createCSVData = async (data: any) => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("INSERT INTO csv SET ?", data);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const checkIfRowExists = async (nrInst: string, nrAgencia: string, cdClient: string, nrContrato: string) => {
  const connection = await dbPool.getConnection();

  try {
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM csv WHERE nrInst = ? AND nrAgencia = ? AND cdClient = ? AND nrContrato = ?", [nrInst, nrAgencia, cdClient, nrContrato]);

    return rows.length > 0;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteAllCSVData = async () => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();
    await connection.query("DELETE FROM csv");
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
