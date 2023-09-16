const service = require('../services/processService')

exports.post = (req, res, next) => {
    let response = service.processCSV(req);
    res.status(201).send(response);
};