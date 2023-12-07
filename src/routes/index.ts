import { Router } from "express";
import ConverterRoutes from '../converter/routes';

const routes = Router();

routes.use(ConverterRoutes);    

export default routes;