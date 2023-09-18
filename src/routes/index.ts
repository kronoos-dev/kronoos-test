import { Router } from 'express';
import { KronoosController } from '../controllers/KronoosController';

const routes = Router();
const controller = new KronoosController();

routes.get('/', controller.readCsv);

export { routes };