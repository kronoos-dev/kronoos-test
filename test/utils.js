import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import { CSVRead, validNrCpfCnpj } from "../utils.js"
import { transformData } from "../transformData.js"
 
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
        const validCpfMock = validNrCpfCnpj(`85581411000`)
        const validCnpjMock = validNrCpfCnpj(`26527051000160`)

        assert.strictEqual(validCpfMock.isValidCpf, true)
        assert.strictEqual(validCnpjMock.isValidCnpj, true)
    })

    it('should verify vlPresta', async () => {
        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const [{ vlPresta, vlPrestaConsistentes }] = transformData(results);
 
                assert.equal(vlPrestaConsistentes, false)


            }
        )
    })




})