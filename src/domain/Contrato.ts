import { isValidCnpjOrCpf } from "../utils/calidCpfOrCnpj"
import { convertToDate } from "../utils/convertToDate"
import { moneyFormat } from "../utils/moneyFormat";

export type ContratoProps = {
    nrInst:number
    nrAgencia:number
    cdClient:number
    nmClient:string
    nrCpfCnpj:string
    nrContrato:number
    dtContrato:string
    qtPrestacoes:number
    vlTotal: number
    cdProduto:number
    dsProduto:string
    cdCarteira:number
    dsCarteira:string
    nrProposta:number
    nrPresta:number
    tpPresta:string
    nrSeqPre:number
    dtVctPre:string
    vlPresta: number
    vlMora:number
    vlMulta:number
    vlOutAcr:number
    vlIof:number
    vlDescon:number
    vlAtual:number
    idSituac:string
    idSitVen:string
}

export class Contrato {
    private props: ContratoProps
    
    constructor(props: ContratoProps){
        this.props = props
    }

    
    public get nrContrato() : number {
        return this.props.nrContrato
    }
    

    public get vlTotalFormatBR() : string {
        return moneyFormat(this.props.vlTotal); 
    }

    public get vlPrestaFormatBR() : string {
        return moneyFormat(this.props.vlPresta); 
    }

    public get vlMoraFormatBR() : string {
        return moneyFormat(this.props.vlMora); 
    }

    public get dtContratoFormat() : Date {
        return convertToDate(this.props.dtContrato)
    }

    
    public get valideNrCpfCnpj() : boolean {
        return isValidCnpjOrCpf(this.props.nrCpfCnpj)
    }

    public get valideVlPrestaOK(): boolean {
        const vlPrestaCalc = (this.props.vlTotal / this.props.qtPrestacoes).toFixed(2)
        return vlPrestaCalc === Number(this.props.vlPresta).toFixed(2)
    }
}