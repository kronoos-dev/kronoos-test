// src/controllers/csvController.js
const csvService = require('../../domain/services/csvService');


const fs = require('fs');
const csv = require('csv-parser');



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
  csvToJson,
};