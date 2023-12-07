import { Response, Request } from "express";
import { IConverterController } from "./converter.interface";
import { ConverterService } from "./converter.service";


export class ConverterController implements IConverterController {

    constructor(private readonly service: ConverterService){}

    async csv2array(req:Request, res:Response) {
        const {status, response} = await this.service.csv2array('./data.csv');
        return res.status(status).send(response);
    }
}
