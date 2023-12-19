const path = require('path');
const express = require("express");
const router = express.Router();

const { financialProcessingService } = require('../services/financialProcessingService');

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const filePath = path.resolve(__dirname, '../files/data.csv');
    const result = await financialProcessingService(filePath);
    res.status(200).send(result);
  } catch (error) {
    res.status(503).send({
      errorHandle: error.message,
      message: `Error ao processar dados, Se o problema persistir contacte o administrador do sistema`,
    });
  }
});

module.exports = router;
