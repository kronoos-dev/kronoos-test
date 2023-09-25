import { ValidateCPFCNPJ } from "../Model/csvModel";
import validateCNPJ from "./validateCnpj";
import validateCPF from "./validateCpf";

export default function validateCpfCnpj(input: string): ValidateCPFCNPJ {
  const cleanInput = input.replace(/[^\d]/g, '');
  let validateReturn: ValidateCPFCNPJ

  if (cleanInput.length === 11) {
    const isValid = validateCPF(cleanInput);
    return { type: 'CPF', isValid, value: input };
  } else if (cleanInput.length === 14) {
    const isValid = validateCNPJ(cleanInput);
    return { type: 'CNPJ', isValid, value: input };
  } else {
    return { type: 'Valor', isValid: false, value: input };
  }
}