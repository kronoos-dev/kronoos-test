const MyEntityService = require('../services/MyEntityService');

class MyEntityController {
  constructor(filePath) {
    this.entityService = new MyEntityService(filePath); 
  }

/**
 * @swagger
 * tags:
 *   name: Entidades
 *   description: Operações relacionadas a entidades
 */

/**
 * @swagger
 * /api/entities:
 *   get:
 *     summary: Retorna a lista de entidades.
 *     tags: [Entidades]
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número da página para paginação.
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: limit
 *         description: Limite de resultados por página.
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de entidades.
 *       500:
 *         description: Erro interno do servidor.
 */

  async getEntities(req, res) {
    try {
      const { page, limit } = req.query;
      const entities = await this.entityService.getEntities(page, limit);
      res.status(200).json(entities);
    } catch (error) {
      console.error('Erro ao obter os dados das entidades:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = MyEntityController;
