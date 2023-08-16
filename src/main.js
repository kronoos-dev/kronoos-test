const fs = require("fs");
const { csvHandler } = require("./utils/csvHandler/csvHandler");
const {
  currencyFormatter,
} = require("./utils/currencyFormatter/currencyFormatter");
const {
  cpfCnpjValidate,
  validatePrestationCalculations,
} = require("./core/validations");
const { formattedDate } = require("./utils/dateFormater/dateFormater");

try {
  // 1. Ler dados do CSV
  const data = csvHandler("data.csv");

  // 2. Processar e formatar os dados
  const processedData = data.map((item) => {
    if (!cpfCnpjValidate(item.nrCpfCnpj)) {
      console.log("CPF ou CNPJ inválidos:", item.nrCpfCnpj);
    }

    if (!validatePrestationCalculations(item)) {
      console.log(
        "Cálculos de prestações incorretos",
        "valor apresentado:",
        currencyFormatter(item.vlPresta)
      );
    }
    {
      return {
        ...item,
        vlTotal: currencyFormatter(item.vlTotal),
        dtContrato: formattedDate(item.dtContrato),
        dtVctPre: formattedDate(item.dtVctPre),
      };
    }
  });

  // 3. Criar um novo arquivo CSV com os dados processados
  const csvOutput = "processed_data.csv";
  const csvStream = fs.createWriteStream(csvOutput);
  csvStream.write(
    "nrInst,nrAgencia,cdClient,nmClient,nrCpfCnpj,nrContrato,dtContrato,qtPrestacoes,vlTotal,cdProduto,dsProduto,cdCarteira,dsCarteira,nrProposta,nrPresta,tpPresta,nrSeqPre,dtVctPre,vlPresta,vlMora,vlMulta,vlOutAcr,vlIof,vlDescon,vlAtual,idSituac,idSitVen,formattedTotal,isCpfCnpjValid,isPrestaValid,formattedContratoDate,formattedVctPreDate\n"
  );

  processedData.forEach((item) => {
    csvStream.write(
      `${item.nrInst},${item.nrAgencia},${item.cdClient},${item.nmClient},${item.nrCpfCnpj},${item.nrContrato},${item.dtContrato},${item.qtPrestacoes},${item.vlTotal},${item.cdProduto},${item.dsProduto},${item.cdCarteira},${item.dsCarteira},${item.nrProposta},${item.nrPresta},${item.tpPresta},${item.nrSeqPre},${item.dtVctPre},${item.vlPresta},${item.vlMora},${item.vlMulta},${item.vlOutAcr},${item.vlIof},${item.vlDescon},${item.vlAtual},${item.idSituac},${item.idSitVen},"${item.formattedTotal}",${item.isCpfCnpjValid},${item.isPrestaValid},"${item.formattedContratoDate}","${item.formattedVctPreDate}"\n`
    );
  });

  csvStream.end();

  console.log("Processed data saved to", csvOutput);
} catch (error) {
  console.error("Error:", error);
}
