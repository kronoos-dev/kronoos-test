export function isCpfValid(cpf) {
  if (!cpf) return false;

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  if (remainder < 2) {
    if (parseInt(cpf.charAt(9)) !== 0) return false;
  } else {
    if (parseInt(cpf.charAt(9)) !== 11 - remainder) return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  if (remainder < 2) {
    if (parseInt(cpf.charAt(10)) !== 0) return false;
  } else {
    if (parseInt(cpf.charAt(10)) !== 11 - remainder) return false;
  }

  return true;
}

export function isCnpjValid(cnpj) {
  if (!cnpj) return false;

  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;

  let sum = 0;
  let factor = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  let remainder = sum % 11;
  if (parseInt(cnpj.charAt(12)) !== (remainder < 2 ? 0 : 11 - remainder))
    return false;

  sum = 0;
  factor = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  remainder = sum % 11;
  return parseInt(cnpj.charAt(13)) === (remainder < 2 ? 0 : 11 - remainder);
}
