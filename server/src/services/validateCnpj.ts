export default function validateCNPJ(cnpj: string): boolean {
  // Remove qualquer formatação não numérica
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

  // Verifica se o CNPJ possui 14 dígitos
  if (cleanCNPJ.length !== 14) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(cleanCNPJ)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let sum = 0;
  const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights[i];
  }
  const firstDigit = 11 - (sum % 11);

  // Verifica se o primeiro dígito verificador é válido
  if (firstDigit > 9 ? 0 : firstDigit !== parseInt(cleanCNPJ.charAt(12))) {
    return false;
  }

  // Calcula o segundo dígito verificador
  sum = 0;
  weights.unshift(6); // Adiciona o peso 6 para o segundo dígito
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * weights[i];
  }
  const secondDigit = 11 - (sum % 11);

  // Verifica se o segundo dígito verificador é válido
  if (secondDigit > 9 ? 0 : secondDigit !== parseInt(cleanCNPJ.charAt(13))) {
    return false;
  }

  // CNPJ válido
  return true;
}
