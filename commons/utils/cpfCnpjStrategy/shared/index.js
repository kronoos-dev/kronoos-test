const cpfCnpjStringToArray = cpfCnpj => {
  const stringToArray = cpfCnpj.split('')
  return stringToArray.map(str => parseInt(str, 10))
}

const cpfCnpjCheckDigit = (cpfCnpjArray, multiplierArray) => {
  const multiplyArrays = cpfCnpjArray.map((e, i) => e * multiplierArray[i])
  const sumArrays = multiplyArrays.reduce((a, b) => a + b)
  const restOfDivision = sumArrays % 11
  return restOfDivision < 2 ? 0 : 11 - restOfDivision
}

export { cpfCnpjStringToArray, cpfCnpjCheckDigit }
