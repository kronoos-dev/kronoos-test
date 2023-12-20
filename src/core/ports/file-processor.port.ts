import fs from "fs";

abstract class FileProcessorPort {
  abstract process(data: fs.ReadStream): Promise<any>;
}

export default FileProcessorPort;