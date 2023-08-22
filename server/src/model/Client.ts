import { v4 as uuid } from "uuid";

class Client {
  id?: string;
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: string;
  isCPFourCNPJvalidate: string;
  nrContrato: number;
  dtContrato: string;
  qtPrestacoes: number;
  vlTotal: string;
  cdProduto: number;
  dsProduto: string;
  cdCarteira: number;
  dsCarteira: string;
  nrProposta: number;
  nrPresta: number;
  tpPresta: string;
  nrSeqPre: number;
  dtVctPre: string;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Client };