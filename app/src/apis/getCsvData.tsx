import axios from "axios";
export interface ContractData {
  nrAgencia: string;
  cdClient: string;
  nmClient: string;
  nrCpfCnpj: string;
  nrContrato: string;
  dtContrato: string;
  qtPrestacoes: number;
  vlTotal: number;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  dtVctPre: string;
  vlPresta: number;
  vlMora: number;
  vlMulta: number;
  vlOutAcr: number;
  vlIof: number;
  vlDescon: number;
  vlAtual: number;
  idSituac: string;
  idSitVen: string;
  isValidateCpfCnpj: validateCpfCnpj
  isValidateTotalAndInstallments: boolean
}
interface validateCpfCnpj {
  type: "CPF" | 'CNPJ' | 'Valor',
  isValid: boolean,
  value: string
}
export interface ClientData {
  [clientName: string]: {
    [contractNumber: string]: ContractData[];
  }

}

export interface GetCsvDataType {
  data: ClientData;
  page: number;
  perPage: number;
  totalItems: number;
}

type ParamType = {
  page: number
  perPage:string
}
function GetCsvData(params: ParamType) {
  return axios.get(`http://localhost:3333/?page=${params.page}&perPage=${params.perPage}`)
      .then(response => {
        return response.data
      })
      .catch(error => {
        console.error(error);
      });
}

export default GetCsvData