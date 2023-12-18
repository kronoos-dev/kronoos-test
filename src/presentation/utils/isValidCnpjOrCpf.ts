export const isValidCPF = (cpf: string): boolean => {
  // Remove any non-numeric characters
  const numericCPF = cpf.replace(/\D/g, '')

  // Check if the CPF has a valid length
  if (numericCPF.length !== 11) {
    return false
  }

  // Calculate the verification digits
  const digits = numericCPF.split('').map(Number)
  const [a, b, c, d, e, f, g, h, i] = digits
  const firstVerificationDigit = (a * 10 + b * 9 + c * 8 + d * 7 + e * 6 + f * 5 + g * 4 + h * 3 + i * 2) % 11
  const calculatedFirstDigit = firstVerificationDigit < 2 ? 0 : 11 - firstVerificationDigit

  const secondVerificationDigit = (a * 11 + b * 10 + c * 9 + d * 8 + e * 7 + f * 6 + g * 5 + h * 4 + i * 3 + calculatedFirstDigit * 2) % 11
  const calculatedSecondDigit = secondVerificationDigit < 2 ? 0 : 11 - secondVerificationDigit

  // Check if the calculated digits match the provided ones
  return calculatedFirstDigit === digits[9] && calculatedSecondDigit === digits[10]
}

export const isValidCNPJ = (cnpj: string): boolean => {
  // Remove any non-numeric characters
  const numericCNPJ = cnpj.replace(/\D/g, '')

  const dummyCnpjList = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ]

  // Validates dummy
  if (dummyCnpjList.includes(numericCNPJ)) {
    return false
  }

  // Check if the CNPJ has a valid length
  if (numericCNPJ.length !== 14) {
    return false;
  }

  // Calculate the verification digits
  const digits = numericCNPJ.split('').map(Number)
  const [a, b, c, d, e, f, g, h, i, j, k, l] = digits

  const firstVerificationDigit = (a * 5 + b * 4 + c * 3 + d * 2 + e * 9 + f * 8 + g * 7 + h * 6 + i * 5 + j * 4 + k * 3 + l * 2) % 11
  const calculatedFirstDigit = firstVerificationDigit < 2 ? 0 : 11 - firstVerificationDigit

  const secondVerificationDigit = (a * 6 + b * 5 + c * 4 + d * 3 + e * 2 + f * 9 + g * 8 + h * 7 + i * 6 + j * 5 + k * 4 + l * 3 + calculatedFirstDigit * 2) % 11
  const calculatedSecondDigit = secondVerificationDigit < 2 ? 0 : 11 - secondVerificationDigit

  // Check if the calculated digits match the provided ones
  return calculatedFirstDigit === digits[12] && calculatedSecondDigit === digits[13]
}

export const isValidCnpjOrCpf = (document: string) => {
  const numericDocument = document.replace(/\D/g, '')
  if (numericDocument.length === 11) {
    return isValidCPF(document)
  } else if (numericDocument.length === 14) {
    return isValidCNPJ(document)
  } else {
    return false
  }
}