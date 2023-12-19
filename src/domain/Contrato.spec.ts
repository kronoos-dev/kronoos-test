import { Contrato } from "./Contrato";

describe("Contrato", ()=> {
    it("Teste", ()=> {
        const contrato = new Contrato({
            nrInst:533,
            nrAgencia:32,
            cdClient:56133,
            nmClient:"CLIENTE 1",
            nrCpfCnpj:"41854274761",
            nrContrato:733067,
            dtContrato:"20221227",
            qtPrestacoes:5,
            vlTotal:83720.19,
            cdProduto:777,
            dsProduto:"CDC PESSOA JURIDICA",
            cdCarteira:17,
            dsCarteira:"CRÉDITO DIRETO AO CONSUMIDOR",
            nrProposta:798586,
            nrPresta:2,
            tpPresta:"Original",
            nrSeqPre:0,
            dtVctPre:"20220406",
            vlPresta:17524.03,
            vlMora:29196.96,
            vlMulta:536.4,
            vlOutAcr:0,
            vlIof:0,
            vlDescon:0,
            vlAtual:47257.39,
            idSituac:"Aberta",
            idSitVen:"Vencida"

        })

        // Assert
        expect(contrato.dtContratoFormat.toISOString()).toBe(new Date(2022, 11, 27).toISOString())
        expect(contrato.nrContrato).toBe(733067)
        expect(contrato.valideNrCpfCnpj).toBeFalsy()
        expect(contrato.valideVlPrestaOK).toBeFalsy()
        expect(contrato.vlMoraFormatBR).toBe("R$\xa029.196,96")
        expect(contrato.vlPrestaFormatBR).toBe("R$\xa017.524,03")
        expect(contrato.vlTotalFormatBR).toBe("R$\xa083.720,19")
    })
})