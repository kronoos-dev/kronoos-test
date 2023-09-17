interface BaseUser
{
  nrInst: string;
  nrAgencia: string;
  cdClient: string;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: string;
  qtPrestacoes: string;
  vlTotal: string;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;
}


export interface CsvUser extends BaseUser
{
  dtContrato: string;
  dtVctPre: string;
}

export interface User extends BaseUser
{
  dtContrato: Date;
  dtVctPre: Date;
}