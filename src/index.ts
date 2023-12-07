import express from 'express';
import config from './config';

import routes from './routes';

const main = () =>{
    const app = express();
    app.use(`/api/${config.apiVersion}`, routes)
    app.listen( process.env.PORT || 3000);
}

main()