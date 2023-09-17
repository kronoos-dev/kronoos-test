import { cnpj, cpf } from "cpf-cnpj-validator";
import {
  convertDateStringToJsDate,
  convertDecimalToBrlMoney,
} from "src/common/utils";

export class CustomerDto {
  nrInst: number;
  nrAgencia: number;
  cdClient: number;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: number;
  dtContrato: Date;
  qtPrestacoes: number;
  vlTotal: string;
  cdProduto: number;
  dsProduto: string;
  cdCarteira: number;
  dsCarteira: string;
  nrProposta: number;
  nrPresta: number;
  tpPresta: string;
  nrSeqPre: number;
  dtVctPre: Date;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;

  static validateAndConvertAnyToCustomer(data: any): CustomerDto | string {
    // Validações
    const nullColumn = Object.values(data).some((x) => !x);
    if (nullColumn)
      return `Registro possui coluna ${nullColumn} com valor nulo e/ou vazio`;

    const cpfOrCnpj = data.nrCpfCnpj.replace(/\D/g, "");
    if (!cpf.isValid(cpfOrCnpj) && !cnpj.isValid(cpfOrCnpj))
      return "Cpf/cnpj inválido";

    if (
      Number((Number(data.vlTotal) / Number(data.qtPrestacoes)).toFixed(2)) !==
      Number(data.vlPresta)
    )
      return `Campo vlTotal dividido por qtPrestacoes não é igual ao campo vlPresta`;
    // Fim validações
    return {
      nrInst: Number(data.nrInst),
      nrAgencia: Number(data.nrAgencia),
      cdClient: Number(data.cdClient),
      nmClient: data.nmClient,
      nrCpfCnpj: cpfOrCnpj,
      nrContrato: Number(data.nrContrato),
      dtContrato: convertDateStringToJsDate(data.dtContrato),
      qtPrestacoes: Number(data.qtPrestacoes),
      vlTotal: convertDecimalToBrlMoney(data.vlTotal),
      cdProduto: Number(data.cdProduto),
      dsProduto: data.dsProduto,
      cdCarteira: Number(data.cdCarteira),
      dsCarteira: data.dsCarteira,
      nrProposta: Number(data.nrProposta),
      nrPresta: Number(data.nrPresta),
      tpPresta: data.tpPresta,
      nrSeqPre: Number(data.nrSeqPre),
      dtVctPre: convertDateStringToJsDate(data.dtVctPre),
      vlPresta: convertDecimalToBrlMoney(data.vlPresta),
      vlMora: convertDecimalToBrlMoney(data.vlMora),
      vlMulta: convertDecimalToBrlMoney(data.vlMulta),
      vlOutAcr: convertDecimalToBrlMoney(data.vlOutAcr),
      vlIof: convertDecimalToBrlMoney(data.vlIof),
      vlDescon: convertDecimalToBrlMoney(data.vlDescon),
      vlAtual: convertDecimalToBrlMoney(data.vlAtual),
      idSituac: data.idSituac,
      idSitVen: data.idSitVen,
    };
  }
}
