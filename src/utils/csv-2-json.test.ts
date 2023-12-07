import { expect } from 'earl'
import { csv2Json } from './csv-2-json'
import { resolve } from 'path'

const MOCKS_PATH = resolve(__dirname, 'mocks')

describe('CSV2Json', () => {
    it('should parse successfully a good csv file', async () => {
        const result = await csv2Json(resolve(MOCKS_PATH, 'csv.csv')) as any
        expect(typeof result).toEqual('object')
        expect(Object.keys(result[0])).toEqual([
            'column1',
            'column2',
            'column3'
        ])
    })
})