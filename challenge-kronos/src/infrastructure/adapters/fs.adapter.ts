import FileReaderPort from "../../core/ports/file-reader.port";
import fs from "fs";
import CSVReadError from "../../errors/csv-reader.error";

class FsAdapter extends FileReaderPort {
  async read(file: Express.Multer.File): Promise< fs.ReadStream> {
    try {
        const stream = fs.createReadStream(file.path);
        return stream;
    } catch (e) {
      if(e instanceof Error)
        throw new CSVReadError(e.message, e);
      else
        throw new CSVReadError("Error reading file");
    }
  }
}

export default FsAdapter;