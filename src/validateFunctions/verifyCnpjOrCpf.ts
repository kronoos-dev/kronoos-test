import Cnpj from "./cnpj";
import Cpf from "./cpf";

export function isCpfOrCnpj(input: string): string {
  if (input.length === 11) {
    const cpf = new Cpf(input);
    return cpf.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (input.length === 14) {
    const cnpj = new Cnpj(input);
    return cnpj.value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return `Invalid characters ${input}`;
  }
}
