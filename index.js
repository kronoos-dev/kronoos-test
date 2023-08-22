const Helper = require('./helper');

Helper.csvParse('./data.csv').then( (data) => {
    console.log(data);
}).catch( (error) => {
    console.error(error)
})

