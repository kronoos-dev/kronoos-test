import { FileTransformerRepository } from "../../application/repositories/file-transformer-repository";
import { CSVParseMock } from "../utils/csv-parse-mock";



export class InMemoryFileTransformerRepositoryTest  extends FileTransformerRepository{
  async transformFromCsvToArray(source: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if(source){
        resolve(CSVParseMock.transform(source))
      }else{
        reject('error')
      }
  });
    }
  }
