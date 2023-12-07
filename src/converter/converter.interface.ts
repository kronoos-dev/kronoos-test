import { Request, Response } from "express";

export interface IConverterController {
    csv2array(req: Request, res: Response) : void
}