import { parseCSV } from "../../services/parseCsv";

describe("parseCSV", () => {
  it("should parse the CSV file and return an array of objects", async () => {
    const filePath = "./src/data/data.csv";
    const tableRowsSize = 10_086;
    const someExpectedData = [
      {
        cdCarteira: "7",
        cdClient: "61460",
        cdProduto: "858",
        dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR",
        dsProduto: "CDC PESSOA JURIDICA",
        dtContrato: "20220309",
        dtVctPre: "20230805",
        idSitVen: "Vencida",
        idSituac: "Aberta",
        nmClient: "CLIENTE 1788",
        nrAgencia: "15",
        nrContrato: "344971",
        nrCpfCnpj: "541599793992",
        nrInst: "1312",
        nrPresta: "5",
        nrProposta: "135830",
        nrSeqPre: "0",
        qtPrestacoes: "9",
        tpPresta: "Original",
        vlAtual: "105899.01000000001",
        vlDescon: "0",
        vlIof: "0",
        vlMora: "83787.85",
        vlMulta: "19871.28",
        vlOutAcr: "0",
        vlPresta: "2239.88",
        vlTotal: "74353.69",
      },
      {
        cdCarteira: "19",
        cdClient: "55961",
        cdProduto: "1460",
        dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR",
        dsProduto: "CDC PESSOA JURIDICA",
        dtContrato: "20230727",
        dtVctPre: "20241114",
        idSitVen: "Vencida",
        idSituac: "Aberta",
        nmClient: "CLIENTE 1832",
        nrAgencia: "26",
        nrContrato: "902650",
        nrCpfCnpj: "503596134012",
        nrInst: "462",
        nrPresta: "5",
        nrProposta: "182003",
        nrSeqPre: "0",
        qtPrestacoes: "9",
        tpPresta: "Original",
        vlAtual: "149919.72",
        vlDescon: "0",
        vlIof: "0",
        vlMora: "27730.75",
        vlMulta: "32402.32",
        vlOutAcr: "0",
        vlPresta: "89786.65",
        vlTotal: "27159.3",
      },
      {
        cdCarteira: "4",
        cdClient: "60838",
        cdProduto: "1130",
        dsCarteira: "CRÉDITO DIRETO AO CONSUMIDOR",
        dsProduto: "CDC PESSOA JURIDICA",
        dtContrato: "20231009",
        dtVctPre: "20240301",
        idSitVen: "Vencida",
        idSituac: "Aberta",
        nmClient: "CLIENTE 1850",
        nrAgencia: "14",
        nrContrato: "511631",
        nrCpfCnpj: "705410767675",
        nrInst: "1602",
        nrPresta: "5",
        nrProposta: "487942",
        nrSeqPre: "0",
        qtPrestacoes: "5",
        tpPresta: "Original",
        vlAtual: "123071.6",
        vlDescon: "0",
        vlIof: "0",
        vlMora: "46136.29",
        vlMulta: "45858.09",
        vlOutAcr: "0",
        vlPresta: "31077.22",
        vlTotal: "51588.42",
      },
    ];

    const result = await parseCSV(filePath);

    expect(result).toContainEqual(someExpectedData[0]);
    expect(result).toContainEqual(someExpectedData[1]);
    expect(result).toContainEqual(someExpectedData[2]);

    expect(result).toHaveLength(tableRowsSize);
  });

  it("should throw an error if the CSV file cannot be parsed", async () => {
    jest.setTimeout(10_000);
    const filePath = "./path/to/invalid/csv/file.csv";

    expect(parseCSV(filePath)).rejects.toThrow();
  });
});
