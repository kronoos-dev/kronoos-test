import { GridColDef } from "@mui/x-data-grid";
import { formatCurrency, validateCpfAndCnpj } from "../../../utils";
import dayjs from "dayjs";

export const columnsConfig = () => {
  const columns: GridColDef[] = [
    { field: "nrInst", headerName: "Instância", width: 120 },
    { field: "nrAgencia", headerName: "Agência", width: 120 },
    { field: "cdClient", headerName: "Código do Cliente", width: 180 },
    { field: "nmClient", headerName: "Nome do Cliente", width: 200 },

    {
      field: "nrCpfCnpj",
      headerName: "CPF/CNPJ",
      width: 150,
      renderCell: (params) => {
        const cpfCnpj = params.value as string;
        const { value, valid } = validateCpfAndCnpj(cpfCnpj);

        if (valid) {
          return <span style={{ color: "green" }}>{value}</span>; // Valor formatado se for válido
        } else {
          return <span style={{ color: "red" }}>Inválido</span>; // Exibe "Inválido" em vermelho se for inválido
        }
      },
    },
    { field: "nrContrato", headerName: "Contrato", width: 120 },
    { field: "dtContrato", headerName: "Data do Contrato", width: 160, valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY") },
    { field: "qtPrestacoes", headerName: "Prestações", width: 120 },
    {
      field: "vlTotal",
      headerName: "Valor Total",
      width: 150,
      valueFormatter: (params) => formatCurrency(Number(params.value)),
    },

    {
      field: "vlPresta",
      headerName: "Valor da Prestação",
      width: 150,

      valueGetter: (params) => {
        const vlTotal = Number(params.row.vlTotal);
        const qtPrestacoes = Number(params.row.qtPrestacoes);
        return formatCurrency(vlTotal / qtPrestacoes);
      },
    },

    {
      field: "vlMora",
      headerName: "Mora",
      width: 120,
      valueFormatter: (params) => formatCurrency(Number(params.value)),
    },
    { field: "cdProduto", headerName: "Código do Produto", width: 180 },
    { field: "dsProduto", headerName: "Descrição do Produto", width: 200 },
    { field: "cdCarteira", headerName: "Código da Carteira", width: 180 },
    { field: "dsCarteira", headerName: "Descrição da Carteira", width: 200 },
    { field: "nrProposta", headerName: "Proposta", width: 120 },
    { field: "nrPresta", headerName: "Prestação", width: 120 },
    { field: "tpPresta", headerName: "Tipo de Prestação", width: 180 },
    { field: "nrSeqPre", headerName: "Sequência da Prestação", width: 180 },
    { field: "dtVctPre", headerName: "Data de Vencimento da Prestação", width: 250, valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY") },
    { field: "vlMulta", headerName: "Multa", width: 120, valueFormatter: (params) => formatCurrency(Number(params.value)) },
    { field: "vlOutAcr", headerName: "Outros Acréscimos", width: 180, valueFormatter: (params) => formatCurrency(Number(params.value)) },
    { field: "vlIof", headerName: "IOF", width: 120, valueFormatter: (params) => formatCurrency(Number(params.value)) },
    { field: "vlDescon", headerName: "Desconto", width: 120, valueFormatter: (params) => formatCurrency(Number(params.value)) },
    { field: "vlAtual", headerName: "Valor Atual", width: 200, valueFormatter: (params) => formatCurrency(Number(params.value)) },
    { field: "idSituac", headerName: "ID da Situação", width: 150 },
    { field: "idSitVen", headerName: "ID da Situação da Venda", width: 200 },
  ];
  return { columns };
};
