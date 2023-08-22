import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import { CSVRead, validNrCpfCnpj, validatePrestationCalculation, brlFormatter, isValidDate } from "../utils.js"
import { transformData } from "../transform.js"

describe('TransformData', () => {

    it('should verify R$', async () => {
        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const [{ vlTotal, vlPresta, vlMora }] = transformData(results);

                assert.strictEqual(vlTotal.includes('R$'), true)
                assert.strictEqual(vlPresta.includes('R$'), true)
                assert.strictEqual(vlMora.includes('R$'), true)
            }
        )
    })

    it('should verify CPF and CNPJ', async () => {
        const validCpfMock = validNrCpfCnpj(`85581411000`),
            validCnpjMock = validNrCpfCnpj(`26527051000160`)

        assert.strictEqual(validCpfMock.isValidCpf, true)
        assert.strictEqual(validCnpjMock.isValidCnpj, true)
    })

    it('should verify vlPresta', async () => {
        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const [{ vlTotalOrigin: vlTotal, qtPrestacoes, vlPrestationCalculation }] = transformData(results);
                const prestationCalculation = validatePrestationCalculation(vlTotal, qtPrestacoes)
                assert.strictEqual(vlPrestationCalculation, brlFormatter.format(prestationCalculation))
            }
        )
    })

    it('should verify date format', async () => {
        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const [{ dtContrato, dtVctPre }] = transformData(results);

                assert.equal(isValidDate(dtContrato.toISOString()), true)
                assert.equal(isValidDate(dtVctPre.toISOString()), true)

            }
        )
    })

})