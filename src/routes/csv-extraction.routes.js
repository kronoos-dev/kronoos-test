import { Router } from 'express';
import CsvExtractionController from '../controllers/csv-extraction.controller.js';

const csv_routes = Router();

csv_routes.post('/', CsvExtractionController.receive_file);

export default csv_routes;
