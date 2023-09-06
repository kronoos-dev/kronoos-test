const express = require('express');
const router = express.Router();
const MyEntityController = require('../controllers/myEntityController');
const { swaggerUi, specs } = require('../swagger'); // Importe as configurações do Swagger

const entidadeController = new MyEntityController('C:\\projeto\\kronoos\\data.csv');

// Esta rota irá lidar com a leitura do arquivo CSV e retornar os dados em JSON
router.get('/dados-do-csv', async (req, res) => {
  try {
    const entidades = await entidadeController.obter(); // Use o método do controlador
    res.status(200).json(entidades); // Responda com os dados em JSON
  } catch (error) {
    console.error('Erro ao obter a lista de entidades:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



// Adicione a rota Swagger para esta rota
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
