import { Router } from 'express';
import csv_routes from './csv-extraction.routes.js';

const routes = Router();

routes.use('/csv-extraction', csv_routes);

export default routes;
