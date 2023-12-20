type State = {
  contracts: Contract[];
  filter: {
    page: number;
    limit: number;
    filter: string;
  };
};

type Contract = {
  id: number;
  nrInst: string;
  nrAgencia: string;
  nrContrato: string;
  dtContrato: string;
  qtPrestacoes: number;
  vlTotal: number;
  nrProposta: string;
  idSituac: string;
  idSitVen: string;
  cliente: {
    id: number;
    cdClient: string;
    nmClient: string;
    nrCpfCnpj: string;
  };
  produto: {
    id: number;
    cdProduto: string;
    dsProduto: string;
  };
  carteira: {
    id: number;
    cdCarteira: string;
    dsCarteira: string;
  };
  prestacao: {
    id: number;
    nrPresta: string;
    tpPresta: string;
    nrSeqPre: string;
    dtVctPre: string;
    vlPresta: number;
    vlMora: number;
    vlMulta: number;
    vlOutAcr: number;
    vlIof: number;
    vlDescon: number;
    vlAtual: number;
  };
};
