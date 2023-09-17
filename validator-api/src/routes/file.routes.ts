import { Router} from 'express';
import FileController from "../controllers/file.controller";
import multer from "multer";
import * as os from "os";
const routes = Router();
const fileController = new FileController()
const upload = multer({ dest: os.tmpdir() });

routes.post('/upload',upload.single('file'),(req,res)=>{
    const {file} = req;
    fileController.readFile(req, res, file);

});
export default routes;