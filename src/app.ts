import express, { Request, Response, NextFunction } from 'express';

const app = express();

const cors = require("cors");

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
 
app.use(express.json());
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

import paymentsRouter from './routers/paymentsRouter';
 
app.use('/api/payments/', paymentsRouter);


 
export default app;