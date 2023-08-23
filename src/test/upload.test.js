const utils = require("../utils/utils");

describe("Shoud be upload file data", () => {
    it("should be validate is cpf or cnpj", () => {
        const valueCpfCnpj = "37965329859";
        const isValid = utils.isValidCPFCNPJ(valueCpfCnpj);
        expect(isValid).toBe(true);
    });

    it("should be validate prest equal vlTotal / qtPrestacoes", () => {
        const vlPresta = 50;
        const vlTotal = 500;
        const qtPrestacoes = 10;
        const isValid = utils.isValidatePrest(vlPresta, vlTotal, qtPrestacoes);
        expect(isValid).toBe(vlPresta);
    });
})