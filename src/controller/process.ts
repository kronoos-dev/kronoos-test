import { writeFile } from "fs";
import { 
  CSVParser, 
  InstallmentValueValidation,
  CurrencyConverter,
  DateConverter,
  DocumentValidation
} from "../helpers";

export const process = async () => {
  const csvParser = new CSVParser()
  const installmentValueValidation = new InstallmentValueValidation()
  const currencyConverter = new CurrencyConverter()
  const documentValidation = new DocumentValidation()
  const dateConverter = new DateConverter()

  const data = await csvParser.convert('./data.csv')
  const newData = []

  data.forEach(row => {
    row.vlPresta = installmentValueValidation.validate(
      row.vlTotal,
      row.qtPrestacoes,
      row.vlPresta,
    )
    row.vlTotal = currencyConverter.convert(row.vlTotal)
    row.vlMora = currencyConverter.convert(row.vlMora)
    row.vlMulta = currencyConverter.convert(row.vlMulta)
    row.vlOutAcr = currencyConverter.convert(row.vlOutAcr)
    row.vlIof = currencyConverter.convert(row.vlIof)
    row.vlDescon = currencyConverter.convert(row.vlDescon)
    row.vlAtual = currencyConverter.convert(row.vlAtual)

    row.nrCpfCnpj = documentValidation.validate(row.nrCpfCnpj) ? row.nrCpfCnpj : "Inválido"
    row.dtContrato = dateConverter.convert(row.dtContrato)
    row.dtVctPre = dateConverter.convert(row.dtVctPre)

    newData.push(row)
  });

  await writeFile(`./new-data.json`, JSON.stringify(newData, null, 2), 'utf8', err => {
    if(err) {
      console.error('Erro ao salvar novos dados.')
    }
  })
  
}

process()