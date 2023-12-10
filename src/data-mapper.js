import { formatCurrency, formatCpfCnpj, formatDate, formatNumber } from "./formatters/index.js";
import { validateVlPresta } from "./validators/index.js";

const BRLformatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const dataMapper = (data) => {
  const dataErrors = [];

  const [vlTotal, vlTotalError] = formatCurrency(data.vlTotal, 'vlTotal', BRLformatter);
  const [vlPresta, vlPrestaError] = formatCurrency(data.vlPresta, 'vlPresta', BRLformatter);
  const vlPrestaCalcError = validateVlPresta(data);
  if (vlPrestaCalcError) {
    dataErrors.push(vlPrestaCalcError);
  }
  const [vlMora, vlMoraError] = formatCurrency(data.vlMora, 'vlMora', BRLformatter);
  const [vlMulta, vlMultaError] = formatCurrency(data.vlMulta, 'vlMulta', BRLformatter);
  const [vlOutAcr, vlOutAcrError] = formatCurrency(data.vlOutAcr, 'vlOutAcr', BRLformatter);
  const [vlIof, vlIofError] = formatCurrency(data.vlIof, 'vlIof', BRLformatter);
  const [vlDescon, vlDesconError] = formatCurrency(data.vlDescon, 'vlDescon', BRLformatter);
  const [vlAtual, vlAtualError] = formatCurrency(data.vlAtual, 'vlAtual', BRLformatter);


  const [qtPrestacoes, qtPrestacoesError] = formatNumber(data.qtPrestacoes, 'qtPrestacoes');
  const [nrCpfCnpj, nrCpfCnpjError] = formatCpfCnpj(data.nrCpfCnpj, 'nrCpfCnpj');
  const [dtContrato, dtContratoError] = formatDate(data.dtContrato, 'dtContrato');
  const [dtVctPre, dtVctPreError] = formatDate(data.dtVctPre, 'dtVctPre');

  dataErrors.push(
    vlTotalError,
    vlPrestaError,
    vlMoraError,
    qtPrestacoesError,
    nrCpfCnpjError,
    dtContratoError,
    dtVctPreError,
    vlMultaError,
    vlOutAcrError,
    vlIofError,
    vlDesconError,
    vlAtualError,
  );

  return {
    ...data,
    vlTotal,
    vlPresta,
    vlMora,
    vlMulta,
    vlOutAcr,
    vlIof,
    vlDescon,
    vlAtual,
    qtPrestacoes,
    nrCpfCnpj,
    dtContrato,
    dtVctPre,
    rowErrors: dataErrors.filter((error) => error),
  };
}
