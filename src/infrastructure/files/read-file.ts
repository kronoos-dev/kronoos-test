import fs from 'fs';

const fspromise = fs.promises
const readFile = async (filePath: string): Promise<string> => {
    return await fspromise.readFile(filePath, 'utf8');
}

export default readFile