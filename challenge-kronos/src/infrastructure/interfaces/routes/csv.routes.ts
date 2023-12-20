import Express from 'express';
import FsAdapter from "../../adapters/fs.adapter";
import CsvService from "../../../core/use_cases/services/csv.service";
import CsvController from "../controllers/csv.controller";
import multerConfig from "../../config/multer.config";
import FsParserAdapter from "../../adapters/fs-parser.adapter";
import ValidatorAdapter from "../../adapters/validator.adapter";
import ConversorAdapter from "../../adapters/conversor.adapter";

const fsAdapter = new FsAdapter();
const fsParserAdapter = new FsParserAdapter();
const validatorAdapter = new ValidatorAdapter();
const conversorAdapter = new ConversorAdapter();
const csvService = new CsvService(fsAdapter, fsParserAdapter, validatorAdapter, conversorAdapter);
const csvController = new CsvController(csvService);

const router = Express.Router();

router.post('/read', multerConfig.single('file'), csvController.read.bind(csvController));

export default router;
