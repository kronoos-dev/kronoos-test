import * as assert from 'assert'
import { ParseCsvHandler } from '../../../src/data/usecases'
import { CsvModel } from '../../../src/domain/models'

describe('ParseCsvHandler', () => {
  it('should parse CSV data and return formatted data with correct flags', async () => {
    // Mock CSV data
    const csvData: CsvModel[] = [
      {
        nrInst: '533',
        nrAgencia: '32',
        cdClient: '56133',
        nmClient: 'CLIENTE 1',
        nrCpfCnpj: '41854274761',
        nrContrato: '733067',
        dtContrato: '20221227',
        qtPrestacoes: '5',
        vlTotal: '83720.19',
        cdProduto: '777',
        dsProduto: 'CDC PESSOA JURIDICA',
        cdCarteira: '17',
        dsCarteira: 'CRÉDITO DIRETO AO CONSUMIDOR',
        nrProposta: '798586',
        nrPresta: '2',
        tpPresta: 'Original',
        nrSeqPre: '0',
        dtVctPre: '20220406',
        vlPresta: '17524.03',
        vlMora: '29196.96',
        vlMulta: '536.4',
        vlOutAcr: '0',
        vlIof: '0',
        vlDescon: '0',
        vlAtual: '47257.39',
        idSituac: 'Aberta',
        idSitVen: 'Vencida'
      }
    ]

    const handler = new ParseCsvHandler()
    const result = await handler.parse({ csvData })

    // Adjust the expectations based on the structure of CsvModel
    assert.deepEqual(result, {
      "formattedData": [
        {
          "nrInst": "533",
          "nrAgencia": "32",
          "cdClient": "56133",
          "nmClient": "CLIENTE 1",
          "nrCpfCnpj": "41854274761",
          "nrContrato": "733067",
          "dtContrato": "27/12/2022",
          "qtPrestacoes": "5",
          "vlTotal": "R$ 83.720,19",
          "cdProduto": "777",
          "dsProduto": "CDC PESSOA JURIDICA",
          "cdCarteira": "17",
          "dsCarteira": "CRÉDITO DIRETO AO CONSUMIDOR",
          "nrProposta": "798586",
          "nrPresta": "2",
          "tpPresta": "Original",
          "nrSeqPre": "0",
          "dtVctPre": "06/04/2022",
          "vlPresta": "R$ 17.524,03",
          "vlMora": "R$ 29.196,96",
          "vlMulta": "R$ 536,40",
          "vlOutAcr": "R$ 0,00",
          "vlIof": "R$ 0,00",
          "vlDescon": "R$ 0,00",
          "vlAtual": "R$ 47.257,39",
          "idSituac": "Aberta",
          "idSitVen": "Vencida",
          "isPrestaValueCorrect": false,
          "vlPrestaCorrected": "R$ 16.744,04",
          "nrCpfCnpjFormatedFlag": "418.542.747-61",
          "nrCpfCnpjIsValidFlag": false
        }
      ]
    })
  })
})
