class CustomerDto {
    nrInst: number
    nrAgencia: number
    cdClient: number
    nmClient: string
    nrCpfCnpj: number
    nrContrato: number
    dtContrato: Date
    qtPrestacoes: number
    vlTotal: string
    cdProduto: number
    dsProduto: string
    cdCarteira: string
    dsCarteira: number
    nrProposta: number
    nrPresta: number
    tpPresta: string
    nrSeqPre: number
    dtVctPre: Date
    vlPresta: string
    vlMora: string
    vlMulta: string
    vlOutAcr: string
    vlIof: string
    vlDescon: string
    vlAtual: string
    idSituac: string
    idSitVen: string
    hasValidTotalAndInstallment: boolean
    isValidNrCpfCnpj: boolean
    constructor(data: CustomerDto) {
        this.nrInst = data.nrInst
        this.nrAgencia = data.nrAgencia
        this.cdClient = data.cdClient
        this.nmClient = data.nmClient
        this.nrCpfCnpj = data.nrCpfCnpj
        this.nrContrato = data.nrContrato
        this.dtContrato = data.dtContrato
        this.qtPrestacoes = data.qtPrestacoes
        this.vlTotal = data.vlTotal
        this.cdProduto = data.cdProduto
        this.dsProduto = data.dsProduto
        this.cdCarteira = data.cdCarteira
        this.dsCarteira = data.dsCarteira
        this.nrProposta = data.nrProposta
        this.nrPresta = data.nrPresta
        this.tpPresta = data.tpPresta
        this.nrSeqPre = data.nrSeqPre
        this.dtVctPre = data.dtVctPre
        this.vlPresta = data.vlPresta
        this.vlMora = data.vlMora
        this.vlMulta = data.vlMulta
        this.vlOutAcr = data.vlOutAcr
        this.vlIof = data.vlIof
        this.vlDescon = data.vlDescon
        this.vlAtual = data.vlAtual
        this.idSituac = data.idSituac
        this.idSitVen = data.idSitVen
        this.hasValidTotalAndInstallment = data.hasValidTotalAndInstallment
        this.isValidNrCpfCnpj = data.isValidNrCpfCnpj
    }
}

export default CustomerDto
