export const formatCpfOrCnpj = (value: string) => {
  const cleanedValue = value.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cleanedValue.length == 11) {
    // CPF: 999.999.999-99
    return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanedValue.length == 14) {
    // CNPJ: 99.999.999/9999-99
    return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  }
};
