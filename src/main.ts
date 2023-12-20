const dotenv = require('dotenv').config();
import AppRoutes from "./infrastructure/interfaces/routes";
import Express from 'express';

class Main {
    private Routes: AppRoutes;
    private App: Express.Application;
    constructor() {
        this.App = Express();
        this.App.use(Express.json());
        this.Routes = new AppRoutes(Express.Router());
    }

    start() {
        this.App.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

        this.App.use(this.Routes.router());
    }

}

const App = new Main();

App.start();
