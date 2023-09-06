class Entityentidade{
    constructor(nrInst,nrAgencia,cdClient,nmClient,nrCpfCnpj,nrContrato,dtContrato,qtPrestacoes,vlTotal,cdProduto,dsProduto,cdCarteira,dsCarteira,nrProposta,nrPresta,tpPresta,nrSeqPre,dtVctPre,vlPresta,vlMora,vlMulta,vlOutAcr,vlIof,vlDescon,vlAtual,idSituac,idSitVen){
        this.cdCarteira = cdCarteira;
        this.cdClient = cdClient;
        this.cdProduto = cdProduto;
        this.dsCarteira = dsCarteira;
        this.dsProduto = dsProduto;
        this.dtContrato = dtContrato;
        this.dtVctPre = dtVctPre;
        this.idSitVen = idSitVen;
        this.idSituac = idSituac;
        this.nmClient = nmClient;
        this.nrAgencia = nrAgencia;
        this.nrContrato = nrContrato;
        this.nrCpfCnpj = nrCpfCnpj;
        this.nrInst = nrInst;
        this.nrPresta = nrPresta;
        this.nrProposta = nrProposta;
        this.nrSeqPre = nrSeqPre;
        this.qtPrestacoes = qtPrestacoes;
        this.tpPresta = tpPresta;
        this.vlAtual = vlAtual;
        this.vlDescon = vlDescon;
        this.vlIof = vlIof;
        this.vlMora = vlMora;
        this.vlMulta = vlMulta;
        this.vlOutAcr = vlOutAcr;
        this.vlPresta = vlPresta;
        this.vlTotal = vlTotal;
    }
}

module.exports = Entityentidade;