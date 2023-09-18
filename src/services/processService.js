const helper = require('../helpers/helper')

exports.processCSV = async (data) => {
    try {
        return await (async () => {
            let arr = await helper.processFile();
            arr.forEach((obj) => {
                //start format

                //check if the vlTotal / qtPrestacoes is equal to obj.vlPresta
                let vlC = obj.vlTotal / obj.qtPrestacoes;
                obj.vlCorreto =
                    vlC == obj.vlPresta
                        ? "valor correto. - " + helper.formatCurrency(vlC)
                        : "valor incorreto! - " + helper.formatCurrency(vlC);

                //check if is a valid cpf or cnpj
                obj.nrCpfCnpjValid = helper.validCnpjOrCpf(obj.nrCpfCnpj);

                //format all vl* to intl pt-BR
                obj.vlTotal = helper.formatCurrency(obj.vlTotal);
                obj.vlPresta = helper.formatCurrency(obj.vlPresta);
                obj.vlMora = helper.formatCurrency(obj.vlMora);
                obj.vlMulta = helper.formatCurrency(obj.vlMulta);
                obj.vlOutAcr = helper.formatCurrency(obj.vlOutAcr);
                obj.vlIof = helper.formatCurrency(obj.vlIof);
                obj.vlDescon = helper.formatCurrency(obj.vlDescon);
                obj.vlAtual = helper.formatCurrency(obj.vlAtual);

                // //format dates
                obj.dtContrato = helper.formatData(obj.dtContrato);
                obj.dtVctPre = helper.formatData(obj.dtVctPre);

            });
            return arr;
        })();
    } catch (err) {
        console.log(err);
    }
};

