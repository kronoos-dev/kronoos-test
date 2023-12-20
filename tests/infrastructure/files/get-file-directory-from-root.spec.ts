
import path from 'path'
import getFileDirectoryFromRoot from '../../../src/infrastructure/files/get-file-directory-from-root'
describe('getFileDirectoryFromRoot', () => {
    const basePath = path.join(`${__dirname}\\..\\..\\..\\`)

    test('Should return concatenated path', () => {
        const fileName = 'data.csv'
        const concatenatedPath = getFileDirectoryFromRoot('data.csv')

        expect(concatenatedPath).toEqual(basePath+fileName)
    })
})