import Express from "express";
import CsvRoutes from "./csv.routes";

class AppRoutes {
    constructor (private readonly Router: Express.Router) {
        this.Router.use('/csv', CsvRoutes);
    }

    router(): Express.Router {
        return this.Router;
    }
}

export default AppRoutes;