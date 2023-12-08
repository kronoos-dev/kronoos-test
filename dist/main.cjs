"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main.ts
var import_node_fs = __toESM(require("fs"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_csv_parser = __toESM(require("csv-parser"), 1);
var import_cpf_cnpj_validator = require("cpf-cnpj-validator");
var import_node_assert = __toESM(require("assert"), 1);
function convertMoney(value) {
  if (!value)
    throw new Error("value is mandatory");
  const parsedValue = Number(value);
  const result = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(parsedValue);
  import_node_assert.default.ok(result.includes("R$"));
  return result;
}
function cpfCnpjIsValid(data) {
  if (!data)
    return false;
  const isCpf = import_cpf_cnpj_validator.cpf.isValid(data);
  if (isCpf)
    return true;
  const isCnpf = import_cpf_cnpj_validator.cnpj.isValid(data);
  if (isCnpf)
    return true;
  return false;
}
function validateQtdPrest(line) {
  const result = Number(line.vlTotal) / Number(line.qtPrestacoes);
  import_node_assert.default.ok(typeof result === "number");
  return result;
}
function parseDate(date) {
  const year = Number(date.substring(0, 4));
  const month = Number(date.substring(4, 6)) - 1;
  const day = Number(date.substring(6, 8));
  const result = new Date(year, month, day);
  import_node_assert.default.ok(result instanceof Date);
  import_node_assert.default.ok(result.getDate() === day);
  import_node_assert.default.ok(result.getMonth() === month);
  import_node_assert.default.ok(result.getFullYear() === year);
  return result;
}
function main() {
  console.time("process done");
  const filePath = import_node_path.default.resolve("data.csv");
  const csv = (0, import_csv_parser.default)();
  const result = [];
  import_node_fs.default.createReadStream(filePath).pipe(csv).on("data", (line) => {
    const nrCpfCnpjIsValid = cpfCnpjIsValid(line.nrCpfCnpj);
    result.push(__spreadProps(__spreadValues({}, line), {
      vlTotal: convertMoney(line.vlTotal),
      vlPresta: convertMoney(line.vlPresta),
      vlMora: convertMoney(line.vlMora),
      vlAtual: convertMoney(line.vlAtual),
      vlDescon: convertMoney(line.vlDescon),
      vlIof: convertMoney(line.vlIof),
      vlMulta: convertMoney(line.vlMulta),
      vlOutAcr: convertMoney(line.vlOutAcr),
      validQtPrestacoes: validateQtdPrest(line),
      nrCpfCnpj: nrCpfCnpjIsValid ? line.nrCpfCnpj : `${line.nrCpfCnpj}-INVALID`,
      dtContrato: line.dtContrato,
      parsedDtContrato: parseDate(line.dtContrato),
      dtVctPre: line.dtVctPre,
      parsedDtVctPre: parseDate(line.dtVctPre)
    }));
  }).on("end", () => {
    console.timeEnd("process done");
  });
}
main();
