export interface CsvDataDto {
    nrInst: string;
    nrAgencia: string;
    cdClient: string;
    nmClient: string;
    nrCpfCnpj: string;
    nrContrato: string;
    dtContrato: string | Date;
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
    dtVctPre: string | Date;
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
