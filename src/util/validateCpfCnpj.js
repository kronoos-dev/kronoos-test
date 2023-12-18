// Função para validar CPF ou CNPJ
module.exports = function validateCpfCnpj(value) {
  const cleanedValue = value.replace(/\D/g, "");

  // Verifica se o valor é CPF (11 dígitos) ou CNPJ (14 dígitos)
  if (cleanedValue.length === 11) {
    // Validação de CPF
    const cpf = cleanedValue.split("").map(Number);

    const checkDigit = (digits) => {
      const mod = (value, divisor) => value % divisor;
      const sum = (array, start, end) =>
        array
          .slice(start, end)
          .reduce((acc, num, idx) => acc + num * (end - idx), 0);
      const calcDigit = (array, start, end) =>
        mod(sum(array, start, end) * 10, 11) % 10;

      return calcDigit(cpf, 0, digits) === cpf[digits];
    };

    return checkDigit(9) && checkDigit(10);
  } else if (cleanedValue.length === 14) {
    // Validação de CNPJ
    const cnpj = cleanedValue.split("").map(Number);

    const checkDigit = (digits) => {
      const mod = (value, divisor) => value % divisor;
      const sum = (array, start, end) =>
        array
          .slice(start, end)
          .reduce((acc, num, idx) => acc + num * (end - idx + 1), 0);
      const calcDigit = (array, start, end) =>
        mod(sum(array, start, end) * 10, 11) % 10;

      return calcDigit(cnpj, 0, digits) === cnpj[digits];
    };

    return checkDigit(12) && checkDigit(13);
  }

  return false;
};

// module.exports = validateCpfCnpj;
