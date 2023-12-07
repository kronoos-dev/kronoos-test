import { Router } from "express";
import {ConverterController}  from "./converter.controller";
import { ConverterService } from "./converter.service";

const controller = new ConverterController(new ConverterService());

const ConverterRoutes = Router();

ConverterRoutes.get('/csv2array', (req,res)=> controller.csv2array(req,res));

export default Router().use('/converter', ConverterRoutes);