const express = require('express');
const cors = require('cors');
const app = express();
const MyEntityController = require('./controllers/myEntityController'); // Importe a controller
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Importe as configurações do Swagger

app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const filePath = './datateste.csv';
const entityController = new MyEntityController(filePath);

/**
 * @swagger
 * /api/entities:
 *   get:
 *     summary: Retorna a lista de entidades.
 *     tags: [Entidades]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de entidades.
 *       500:
 *         description: Erro interno do servidor.
 */
app.get('/api/entities', async (req, res) => {
  await entityController.getEntities(req, res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
