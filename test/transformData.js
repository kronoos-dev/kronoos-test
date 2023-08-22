import {
    describe,
    it
} from 'node:test'
import assert from 'node:assert'
import { CSVRead } from "../utils.js"
import { transformData } from "../transformData.js"

describe('TransformData', () => {

    it('should verify data is array object', async () => {
        const results = [];
        await CSVRead(
            (data) => results.push(data),
            () => {
                const formatedResults = transformData(results);
                assert.equal(typeof formatedResults, typeof [])
            }
        )
    })

})