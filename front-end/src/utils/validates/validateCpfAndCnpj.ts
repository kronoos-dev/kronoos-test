import { formatCpfOrCnpj } from "..";

export const validateCpfAndCnpj = (value: string) => {
  const cleanedValue = value.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos
  const isValidCPF = cleanedValue.length === 11;
  const isValidCNPJ = cleanedValue.length === 14;

  if (isValidCPF || isValidCNPJ) {
    return {
      value: formatCpfOrCnpj(cleanedValue), // Formata se for válido
      valid: true, // Indica que é válido
    };
  } else {
    return {
      value, // Retorna o valor original
      valid: false, // Indica que é inválido
    };
  }
};
