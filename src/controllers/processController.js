const service = require('../services/processService')

exports.post = async (req, res, next) => {
    let response = service.processCSV(req.body);
    res.status(201).send(await response);
};