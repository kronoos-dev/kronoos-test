export interface CsvData {
  [key: string]: string | number | Date | object | undefined | boolean;
  nrInst: string;
  nrAgencia: string;
  cdClient: string;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: string;
  dtContrato: Date;
  qtPrestacoes: number;
  vlTotal: number;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  dtVctPre: Date;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: number;
  vlIof: number;
  vlDescon: number;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
  isValidateTotalAndInstallments?: boolean;
  isValidateCpfCnpj?: ValidateCPFCNPJ
}


export type ValidateCPFCNPJ = {
  type: 'CPF' | 'CNPJ' | 'Valor'; isValid: boolean, value: string 
}