import {
    describe,
    it,
    mock
} from 'node:test'
import assert from 'node:assert'
import { validNrCpfCnpj, CSVRead, validatePrestationCalculation, brlFormatter, convertToDate } from "../utils.js"



describe('Utils', () => {

    it('should verify brlFormatter', () => {

        console.log(brlFormatter)
    })

})