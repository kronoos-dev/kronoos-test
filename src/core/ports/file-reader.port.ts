import CSVReadError from "../../errors/csv-reader.error";
import fs from "fs";

abstract class FileReaderPort {
  abstract read(file: Express.Multer.File): Promise< fs.ReadStream>;
}

export default FileReaderPort;