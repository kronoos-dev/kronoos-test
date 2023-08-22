const { readData, writeOutput } = require('./utils')
const {
  dtValidation,
  nrCpfCnpjValidation,
  vlFormat,
  vlPrestaValidation
} = require('./core')

const dataPath = './data.csv'
const outputPath = './output'

async function main () {
  try {
    const data = await readData(dataPath)
    const output = { valid: [], invalid: [] }

    data.forEach(row => {
      row.vlTotal = vlPrestaValidation(
        row.vlPresta,
        row.qtPrestacoes,
        row.vlTotal
      )
      row.vlTotal = vlFormat(row.vlTotal)
      row.vlPresta = vlFormat(row.vlPresta)
      row.vlMora = vlFormat(row.vlMora)
      row.nrCpfCnpj = nrCpfCnpjValidation(row.nrCpfCnpj)
      row.dtContrato = dtValidation(row.dtContrato)
      row.dtVctPre = dtValidation(row.dtVctPre)

      //If any field is false, push to invalid array
      Object.values(row).some(field => field === false)
        ? output.invalid.push(row)
        : output.valid.push(row)
    })

    await writeOutput(`${outputPath}/valid.json`, output.valid)
    await writeOutput(`${outputPath}/invalid.json`, output.invalid)
    await writeOutput(
      `${outputPath}/all.json`,
      output.valid.concat(output.invalid)
    )

    console.info(
      `Done!!! ${output.valid.length} valid rows and ${output.invalid.length} invalid rows processed \nCheck output folder for results`
    )
  } catch (error) {
    console.error(error)
  }
}

main()
