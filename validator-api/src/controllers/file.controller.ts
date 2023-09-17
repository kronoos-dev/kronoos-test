import fs from "fs";
import {FileService} from "../service/file.service";
 class FileController {
    public async readFile(req, res, file) {
        try {
            const fileService = new FileService()

            if (!fileService.fileExtensionValidation(file)) {
                return res.status(400).json({message: 'Formato de arquivo inválido. Verifique e tente novamente.'})
            }

            const {headers, data}: any = await fileService.readFile(file);

            if (headers.length === 0) {
                return res.status(400).json({message: 'Dados inválidos. Verifique e tente novamente.'})
            }

            if (!fileService.headerValidation(headers[0])) {
                return res.status(400).json({message: 'Colunas inválidas. Verifique e tente novamente.'})
            }

            const {validatedData, hasError} = fileService.validateData(data);

            if (validatedData.length === 0 ) {
                return res.status(400).json({message: 'Dados inválidos. Verifique e tente novamente.'})
            }

            fs.unlinkSync(file.path)

            return res.status(200).json({data: validatedData, hasError});
        }catch (e) {
            return res.status(500).json({message: 'Erro interno.'})
        }
    }

}

export default FileController;