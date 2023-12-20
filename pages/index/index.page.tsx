import { useEffect } from "react";
import axios from "axios";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { addContracts, incrementPage } from "../../store/slice";
import { AppDispatch, RootState } from "../../store/store";
import {
  formatCPForCNPJ,
  formatCurrency,
  formatDateToDDMMYYYY,
  validateCpfCnpj,
  validateInstallment,
} from "../../utils";
export { Page };

function Page() {
  const headers = [
    {
      text: "Número do contrato",
      value: "nrContrato",
    },
    {
      text: "CPF/CNPJ do Cliente",
      value: "cliente.nrCpfCnpj",
      mask: formatCPForCNPJ,
      validate: validateCpfCnpj,
    },
    {
      text: "Valor total do contrato",
      value: "vlTotal",
      mask: formatCurrency,
    },
    {
      text: "Valor da prestação",
      value: "prestacao.vlPresta",
      mask: formatCurrency,
      validate: {
        args: ["vlTotal", "qtPrestacoes", "prestacao.vlPresta"],
        function: validateInstallment,
      },
    },
    {
      text: "Quatidade de prestações",
      value: "qtPrestacoes",
    },
    {
      text: "Data de vencimento da prestação",
      value: "prestacao.dtVctPre",
      mask: formatDateToDDMMYYYY,
    },
    {
      text: "Data de vencimento do contrato",
      value: "prestacao.dtVctPre",
      mask: formatDateToDDMMYYYY,
    },
  ];

  const dispatch = useDispatch<AppDispatch>();

  const contracts = useSelector((state: RootState) => state.contract.contracts);

  const getContracts =
    () => (dispatch: AppDispatch, getState: () => RootState) =>
      new Promise((resolve, reject) => {
        const {
          contract: {
            filter: { page, limit },
          },
        } = getState();
        axios
          .get(`/api/contrato?page=${page}&limit=${limit}`)
          .then((response) => {
            dispatch(addContracts(response.data.contratos));
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });

  const onHandleScroll = () => {
    dispatch(incrementPage());
    dispatch(getContracts());
  };

  useEffect(() => {
    dispatch(getContracts());
  }, []);

  return (
    <>
      <h1>Contratos</h1>
      <Table
        headers={headers}
        items={contracts}
        handleScroll={onHandleScroll}
      />
    </>
  );
}
