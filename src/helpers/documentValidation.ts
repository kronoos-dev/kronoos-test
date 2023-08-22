export class DocumentValidation {

  validate(documentNumber: string) {

    if (documentNumber.length === 11) {
      return this.cpfValidation(documentNumber)
    }

    if (documentNumber.length === 14) {
      return this.cnpjValidator(documentNumber)
    }

    return false
  }

  private cpfValidation(value: string) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(value.charAt(i)) * (10 - i);
    }

    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === parseInt(value.charAt(9))) {
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(value.charAt(i)) * (11 - i);
      }

      remainder = (sum * 10) % 11;
      return remainder === 10 || remainder === parseInt(value.charAt(10));
    }

    console.log('Não é um CPF válido.')

    return false;
  }

  private cnpjValidator(value: string) {
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    const digits = numbers.slice(12)

    const digit0 = this.validCalcCNPJ(12, numbers)
    if (digit0 !== digits[0]) return false

    const digit1 = this.validCalcCNPJ(13, numbers)

    console.log('Não é um CNPJ válido.')
    
    return digit1 === digits[1]
  }

  private validCalcCNPJ(x: number, numbers: number[]) {
    const slice = numbers.slice(0, x)
    let factor = x - 7
    let sum = 0

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i]
      sum += n * factor--
      if (factor < 2) factor = 9
    }

    const result = 11 - (sum % 11)

    return result > 9 ? 0 : result
  }

}