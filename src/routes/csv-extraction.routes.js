import { Router } from 'express';
import CsvExtractionController from '../controllers/csv-extraction.controller.js';

const csv_routes = Router();

csv_routes.post('/', CsvExtractionController.execute);

export default csv_routes;
