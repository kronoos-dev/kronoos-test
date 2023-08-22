import fs from 'fs'
import csv from "csv-parser";
import { FileTransformerRepository } from "../../application/repositories/file-transformer-repository";
import { ClientContract } from '../../application/repositories/types/client-contract-type';


export class ImplementFileTransformerRepository extends FileTransformerRepository{
  
 async transformFromCsvToArray(source: any): Promise<ClientContract[]> {
    return new Promise((resolve, reject) => {
      const results: ClientContract[] = []
      fs.createReadStream(source)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => {
              resolve(results)
          })
          .on('error', (error) => {
            reject(error)
          });
  });
  }
}