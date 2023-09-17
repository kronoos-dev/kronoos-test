import { Transform } from 'node:stream'
import isValidCpfCnpj from '../commons/utils/cpfCnpjStrategy/index.js'
import formatCurrencyToBRL from '../commons/utils/helpers/currencyFormatter.js'
import formatDateToISO from '../commons/utils/helpers/dateFormatter.js'
import isValidInstallment from '../commons/utils/installments/installmentValidation.js'

const csvTransformHandler = new Transform({
  objectMode: true,
  transform(chunk, enc, callback) {
    const csv = {
      nrInst: chunk.nrInst,
      nrAgencia: chunk.nrAgencia,
      cdClient: chunk.cdClient,
      nmClient: chunk.nmClient,
      nrCpfCnpj: isValidCpfCnpj(chunk.nrCpfCnpj),
      nrContrato: chunk.nrContrato,
      dtContrato: formatDateToISO(chunk.dtContrato),
      qtPrestacoes: chunk.qtPrestacoes,
      vlTotal: formatCurrencyToBRL(chunk.vlTotal),
      cdProduto: chunk.cdProduto,
      dsProduto: chunk.dsProduto,
      cdCarteira: chunk.cdCarteira,
      dsCarteira: chunk.dsCarteira,
      nrProposta: chunk.nrProposta,
      nrPresta: chunk.nrPresta,
      tpPresta: chunk.tpPresta,
      nrSeqPre: chunk.nrSeqPre,
      dtVctPre: formatDateToISO(chunk.dtVctPre),
      vlPresta: isValidInstallment(
        chunk.vlTotal,
        chunk.qtPrestacoes,
        chunk.vlPresta
      ),
      vlMora: formatCurrencyToBRL(chunk.vlMora),
      vlMulta: formatCurrencyToBRL(chunk.vlMulta),
      vlOutAcr: formatCurrencyToBRL(chunk.vlOutAcr),
      vlIof: formatCurrencyToBRL(chunk.vlIof),
      vlDescon: formatCurrencyToBRL(chunk.vlDescon),
      vlAtual: formatCurrencyToBRL(chunk.vlAtual),
      idSituac: chunk.idSituac,
      idSitVen: chunk.idSitVen,
    }
    callback(null, csv)
  },
})

export default csvTransformHandler
