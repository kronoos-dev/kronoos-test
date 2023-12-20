// app.js
const express = require('express');
const multer = require('multer');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const csvController = require('./src/interfaces/controllers/csvController');

const app = express();
app.use(express.json());

// Configurar o multer para processar uploads de arquivos CSV
const storage = multer.memoryStorage();
//const upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' });

// Rota para processar o arquivo CSV
//app.post('/process-csv-array', upload.single('csvFile'), csvController.processCSVToArray);

// Rota para processar o arquivo CSV
// app.post('/process-csv-json', upload.single('csvFile'),  csvController.processCSVToJson);
/*
app.post('/process-csv-json', upload.single('csvFile'), async (req, res) => {
  await csvController.processCSVToJson(req, res);
});*/

//app.get('/obter-dados-formatados', csvController.obterDadosFormatados);


//app.get('/get-records', csvController.getRecordsFromMongoDB);

/*
app.post('/upload-and-save', upload.single('csvFile'), async (req, res) => {
  try {
    // Check if the file is present
    if (!req.file) {
      throw new Error('No CSV file uploaded.');
    }

    // Convert CSV to JSON
    const jsonArray = await csvService.csvToJson(req.file.buffer.toString());

    // Save JSON to MongoDB
    await csvService.saveJsonToMongoDB(jsonArray);

    res.json({ success: true, message: 'Data saved to MongoDB successfully.' });
  } catch (error) {
    console.error('Error uploading and saving CSV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});*/

app.post('/upload-and-save', upload.single('csvFile'), csvController.csvToJson);

// Configurar Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSV Processing API',
      version: '1.0.0',
    },
  },
  apis: ['./src/interfaces/controllers/csvController.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ... outras configurações e rotas ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});