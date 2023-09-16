require('dotenv').config();
const app = require('../src/app');
const port = appPort(process.env.APP_PORT || '3000');
const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Kronos Test Express API with Swagger",
            version: "0.1.0",
            description:
                "## Manipulação de Dados de CSV e Conversão para Array com Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Test Kronos",
                url: "https://github.com/kronoos-dev/kronoos-test",
                email: "gabriel.montibeller@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

function appPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
