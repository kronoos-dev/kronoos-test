import { Main } from "../src/main";
import importCsv from "../src/validateFunctions/csvRead";
import Cnpj from "../src/validateFunctions/cnpj";
import Cpf from "../src/validateFunctions/cpf";
import { formatCurrency } from "../src/validateFunctions/formatCurrency";
import formatDate from "../src/validateFunctions/formatDate";
import { isCpfOrCnpj } from "../src/validateFunctions/verifyCnpjOrCpf";

test("test cnpj and his rules", () => {
  const wrongCnpj = new Cnpj("4231444");
  const correctCnpj = new Cnpj("77.500.772/0001-17");
  expect(wrongCnpj.value).toBe("Invalid CNPJ 4231444");
  expect(correctCnpj.value).toBe("77.500.772/0001-17");
});

test("test cpf and his rules", () => {
  const wrongCpf = new Cpf("4231444");
  const correctCpf = new Cpf("844.590.850-20");
  expect(wrongCpf.value).toBe("Invalid CPF 4231444");
  expect(correctCpf.value).toBe("844.590.850-20");
});

test("test formatCurrency", () => {
  const valueCurrency = formatCurrency(4214.0);
  expect(valueCurrency).toEqual("R$\xa04.214,00");
});

test("test format date", () => {
  expect(formatDate("20211229")).toEqual(new Date("2021-12-29T03:00:00.000Z"));
});

test("test to verify if is cnpj or cpf", () => {
  const result = isCpfOrCnpj("84459085020");
  const secondResult = isCpfOrCnpj("77500772000117");
  const wrongValue = isCpfOrCnpj("42141");
  expect(result).toBe("844.590.850-20");
  expect(secondResult).toBe("77.500.772/0001-17");
  expect(wrongValue).toBe(`Invalid characters 42141`);
});

test("verify installments", async () => {
  const csvData = await importCsv("data.csv");
  const data = new Main(csvData);
  expect(data.data[0].vlPresta).toBe("R$\xa017.524,03 - prestação inválida");
});
