import fs from 'fs';

const checkFileExists = (filename:string) =>{
    if(!fs.existsSync(filename)){
        throw Error(`${filename} was not found`);
    }
    return true
}

export {checkFileExists}