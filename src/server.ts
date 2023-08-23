import fs from 'fs'
import csv from 'csv-parser'

import { priceFormatter, dateFormatter } from './utils/formatter'
import { ClientProps } from 'data-client'
import { cpfCnpjValidate } from './utils/cpfCnpjValidate'
import { calculateInstallment } from './utils/calculateInstallment'

const convertCsvToObject = () => {
  return new Promise((resolve, reject) => {
    const results: ClientProps[] = []
    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data: ClientProps) => {
        results.push(data)
      })
      .on('end', () => {
        resolve(results)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
const clientsList = async () => {
  try {
    const getClientsList: ClientProps[] = await convertCsvToObject()

    getClientsList.map((client: ClientProps) => {
      // IN THE PERFECT WORLD WE HAVE TO CHANGE ALL PORTUGUESE VARIABLES TO ENGLISH
      const vlTotalFormated = priceFormatter(Number(client.vlTotal))
      const vlPrestaFormated = priceFormatter(Number(client.vlPresta))
      const vlMoraFormated = priceFormatter(Number(client.vlMora))
      const vlMultaFormated = priceFormatter(Number(client.vlMulta))
      const vlOutAcrFormated = priceFormatter(Number(client.vlOutAcr))
      const vlIofFormated = priceFormatter(Number(client.vlIof))
      const vlDesconFormated = priceFormatter(Number(client.vlDescon))
      const vlAtualFormated = priceFormatter(Number(client.vlAtual))

      const isValidCpfCnpj = cpfCnpjValidate(client.nrCpfCnpj)

      const dtContratoFormated = dateFormatter(client.dtContrato)
      const dtVctPreFormated = dateFormatter(client.dtVctPre)

      const isEqualInstallmentCalculation = calculateInstallment(
        client.vlTotal,
        client.qtPrestacoes,
        client.vlPresta,
      )

      const clientListFormated = {
        ...client,
        vlTotal: vlTotalFormated,
        vlPresta: vlPrestaFormated,
        vlMora: vlMoraFormated,
        vlMulta: vlMultaFormated,
        vlOutAcr: vlOutAcrFormated,
        vlIof: vlIofFormated,
        vlDescon: vlDesconFormated,
        vlAtual: vlAtualFormated,
        isCpfCnpjTrue: isValidCpfCnpj,
        dtContrato: dtContratoFormated,
        dtVctPre: dtVctPreFormated,
        isEqualInstallmentCalculation,
      }

      console.log(
        '%cserver.ts line:27 sera',
        'color: #007acc;',
        clientListFormated,
      )
      return clientListFormated
    })
  } catch (error) {
    throw new Error('ERROR TO GET DATA FROM CSV FILE ' + error)
  }
}

clientsList()
