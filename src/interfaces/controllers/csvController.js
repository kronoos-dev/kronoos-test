// src/controllers/csvController.js
const csvService = require('../../domain/services/csvService');

const recordService = require('../../domain/services/recordService');


const convertdService = require('../../domain/services/testecsvService');


const fs = require('fs');
const csv = require('csv-parser');



/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: CSV processing operations
 *
 * /process-csv-array:
 *   post:
 *     summary: Process CSV file
 *     tags: [CSV]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - nrInst: 533
 *                 nrAgencia: 32
 *                 cdClient: 56133
 *                 nmClient: "CLIENTE 1"
 *                 nrCpfCnpj: 41854274761
 *                 nrContrato: 733067
 *                 dtContrato: 20221227
 *                 qtPrestacoes: 5
 *                 vlTotal: 83720.19
 *                 cdProduto: 777
 *                 dsProduto: "CDC PESSOA JURIDICA"
 *                 cdCarteira: 17
 *                 dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR"
 *                 nrProposta: 798586
 *                 nrPresta: 2
 *                 tpPresta: "Original"
 *                 nrSeqPre: 0
 *                 dtVctPre: 20220406
 *                 vlPresta: 17524.03
 *                 vlMora: 29196.96
 *                 vlMulta: 536.4
 *                 vlOutAcr: 0
 *                 vlIof: 0
 *                 vlDescon: 0
 *                 vlAtual: 47257.39
 *                 idSituac: "Aberta"
 *                 idSitVen: "Vencida"
 */
const processCSVToArray = async (req, res) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      throw new Error('Nenhum arquivo CSV foi enviado.');
    }

    // Caminho temporário do arquivo
    const tempFilePath = req.file.path;

    // Chama o serviço para processar o CSV
    const csvData = await csvService.readCSV(tempFilePath);

    // Validando CPF/CNPJ
    //  const dadosValidados = csvService.validarCpfCnpj(csvData);

    //  console.log('Dados validados:', dadosValidadosJuridico);

    // Formatando valores
    // const dadosFormatados = csvService.formatarValores(dadosValidados);



    res.json({ success: true, data: csvData });
  } catch (error) {
    console.error('Erro no processamento do CSV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: CSV processing operations
 *
 * /process-csv-json:
 *   post:
 *     summary: Process CSV file
 *     tags: [CSV]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - nrInst: 533
 *                 nrAgencia: 32
 *                 cdClient: 56133
 *                 nmClient: "CLIENTE 1"
 *                 nrCpfCnpj: 41854274761
 *                 nrContrato: 733067
 *                 dtContrato: 20221227
 *                 qtPrestacoes: 5
 *                 vlTotal: 83720.19
 *                 cdProduto: 777
 *                 dsProduto: "CDC PESSOA JURIDICA"
 *                 cdCarteira: 17
 *                 dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR"
 *                 nrProposta: 798586
 *                 nrPresta: 2
 *                 tpPresta: "Original"
 *                 nrSeqPre: 0
 *                 dtVctPre: 20220406
 *                 vlPresta: 17524.03
 *                 vlMora: 29196.96
 *                 vlMulta: 536.4
 *                 vlOutAcr: 0
 *                 vlIof: 0
 *                 vlDescon: 0
 *                 vlAtual: 47257.39
 *                 idSituac: "Aberta"
 *                 idSitVen: "Vencida"
 */
const processCSVToJson = async (req, res) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      throw new Error('Nenhum arquivo CSV foi enviado.');
    }

    console.log("caminho file");
    console.log(req.file.path);
    // Caminho temporário do arquivo
    const tempFilePath = req.file.path;

    const jsonfile = 'src/file/souce.json';

    const jsonArrayx = await csvService.convertCSVtoJSON(tempFilePath, jsonfile)
      .then((results) => {
        console.log('CSV converted to JSON:', results);

        // Validando CPF/CNPJ
        const dadosValidados = csvService.validarCpfCnpj(results);
        console.log('Dados validados:', dadosValidados);

        // Formatando valores
        const dadosFormatados = csvService.formatarValores(dadosValidados);
        console.log('Dados formatados:', dadosFormatados);



      })
      .catch((error) => {
        console.error('Error converting CSV to JSON:', error);
        res.status(500).json({ success: false, error: error.message });
      });

    // recordService.saveJsonToMongoDB(jsonArrayx);
    // Enviar resposta com os dados processados
    // res.json({ success: true, data: jsonArrayx });
    return jsonArrayx;
  } catch (error) {
    console.error('Erro no processamento do CSV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


/**
 * @swagger
 * /obter-dados-formatados:
 *   get:
 *     summary: Obter dados formatados a partir do arquivo JSON
 *     tags: [CSV]
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 // Exemplo dos dados formatados aqui
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Erro na obtenção dos dados formatados
 */
const obterDadosFormatados = async (req, res) => {
  try {
    const caminhoArquivoJSON = 'src/file/souce.json';

    // Chama o método na camada de serviço para obter os dados formatados
    const dadosFormatados = csvService.lerArquivoJSONFormatado(caminhoArquivoJSON);

    // Envia a resposta com os dados formatados
    res.json({ success: true, data: dadosFormatados });
  } catch (error) {
    console.error('Erro na obtenção dos dados formatados:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};



/**
 * @swagger
 * tags:
 *   name: MongoDB
 *   description: MongoDB operations
 *
 * /get-records:
 *   get:
 *     summary: Get records from MongoDB collection
 *     tags: [MongoDB]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 nrInst: 533
 *                 nrAgencia: 32
 *                 cdClient: 56133
 *                 nmClient: "CLIENTE 1"
 *                 nrCpfCnpj: 41854274761
 *                 nrContrato: 733067
 *                 dtContrato: 20221227
 *                 qtPrestacoes: 5
 *                 vlTotal: 83720.19
 *                 cdProduto: 777
 *                 dsProduto: "CDC PESSOA JURIDICA"
 *                 cdCarteira: 17
 *                 dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR"
 *                 nrProposta: 798586
 *                 nrPresta: 2
 *                 tpPresta: "Original"
 *                 nrSeqPre: 0
 *                 dtVctPre: 20220406
 *                 vlPresta: 17524.03
 *                 vlMora: 29196.96
 *                 vlMulta: 536.4
 *                 vlOutAcr: 0
 *                 vlIof: 0
 *                 vlDescon: 0
 *                 vlAtual: 47257.39
 *                 idSituac: "Aberta"
 *                 idSitVen: "Vencida"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Internal Server Error details
 */
const getRecordsFromMongoDB = async (req, res) => {
  try {
    // const caminhoArquivoJSON = 'src/file/souce.json';

    // Chama o método na camada de serviço para obter os dados formatados
    recordService.connectToMongo();
    const dadosFormatados = await recordService.getRecordsFromMongoDB();

    // Envia a resposta com os dados formatados
    res.json({ success: true, data: dadosFormatados });
  } catch (error) {
    console.error('Erro na obtenção dos dados formatados:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


/**
 * @swagger
 * tags:
 *   name: CSV
 *   description: CSV processing operations
 *
 * /upload-and-save:
 *   post:
 *     summary: Upload CSV file and save to MongoDB
 *     tags: [CSV]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               csvFile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Data saved to MongoDB successfully.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Bad Request - Invalid CSV file.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: Internal Server Error details
 */
const csvToJson = async (req, res) => {
  try {
    // Check if the file is present
    if (!req.file) {
      throw new Error('Bad Request - Invalid CSV file.');
    }
    console.log(req.file.buffer);
    let results = [];
    let converJson = [];


    const teste = await fs.createReadStream(req.file.path, { encoding: 'utf-8' })
      .pipe(csv())
      .on('data', function (result) {

        results.push(
          result);

        //  console.log( JSON.parse(result.toString()));
      })
      .on('end', () => {

        /*
        
        
        */
        results.forEach((arr)=>{
          let dadosValidados = csvService.validarCpfCnpj(arr);
          console.log('Dados validados:', dadosValidados);
  
          // Formatando valores
          let dadosFormatados = csvService.formatarValores(dadosValidados);
          console.log('Dados formatados:', dadosFormatados);

        });



        console.log(JSON.stringify(results[0].nrProposta));
        converJson = JSON.stringify(results);
        // console.log(results);
        res.json({ success: true, data: converJson });
        fs.writeFile("CareTeamData.json", JSON.stringify(results), (err) =>
          console.error(err)
        );
      })
    // Convert CSV to JSON
    //   const jsonArray = await csvService.csvToJson(eq.file.path);

    // Save JSON to MongoDB
    // await csvService.saveJsonToMongoDB(jsonArray);
    //const jsonArray =  await convertdService.convertCsvToJson(req.file.path);



    // res.json({ success: true, message: 'Data saved to MongoDB successfully.' });
  } catch (error) {
    console.error('Error uploading and saving CSV:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}



module.exports = {
  processCSVToArray,
  processCSVToJson,
  obterDadosFormatados,
  csvToJson,
  getRecordsFromMongoDB,
};