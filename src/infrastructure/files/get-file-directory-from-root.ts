import path from 'path'

const getFileDirectoryFromRoot = (fileName: string): string => {
    const pathJoin = path.join(`${__dirname}\\..\\..\\..\\${fileName}`)
    return pathJoin;
}

export default getFileDirectoryFromRoot