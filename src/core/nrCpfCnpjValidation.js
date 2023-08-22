//Check if nrCpfCnpj is a valid CPF or CNPJ

const nrCpfCnpjValidation = nrCpfCnpj => {
  //Check if is a string
  if (!/^\d+$/.test(nrCpfCnpj)) return false

  //Same digit validation
  if (/^(\d)\1+$/.test(nrCpfCnpj)) return false

  //Check if is CPF and validate the hash
  if (nrCpfCnpj.length === 11) {
    return cpfValidation(nrCpfCnpj)
  }

  //Check if is CNPJ and validate the hash
  if (nrCpfCnpj.length === 14) {
    return cnpjValidation(nrCpfCnpj)
  }

  return false
}

const cpfValidation = cpf => {
  const digits = cpf.split('').map(Number)
  const sum1 = digits
    .slice(0, 9)
    .reduce((acc, digit, i) => acc + digit * (10 - i), 0)
  const digit1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11)

  const sum2 = digits
    .slice(0, 10)
    .reduce((acc, digit, i) => acc + digit * (11 - i), 0)
  const digit2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11)

  if (digits[9] === digit1 && digits[10] === digit2) return cpf

  return false
}

const cnpjValidation = cnpj => {
  const digits = cnpj.split('').map(Number)
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const sum1 = digits
    .slice(0, 12)
    .reduce((acc, digit, i) => acc + digit * weights1[i], 0)
  const digit1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11)

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const sum2 = digits
    .slice(0, 13)
    .reduce((acc, digit, i) => acc + digit * weights2[i], 0)
  const digit2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11)

  if (digits[12] === digit1 && digits[13] === digit2) return cnpj

  return false
}

module.exports = nrCpfCnpjValidation
