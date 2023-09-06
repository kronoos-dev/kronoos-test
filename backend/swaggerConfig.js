const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'API de Kronoos com Swagger',
      description: 'Documentação da API',
      version: '1.0.0',
    },
  },
  apis: ['./controllers/*.js'], // Padrão de localização das controllers com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
