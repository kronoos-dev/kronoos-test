  
function formatCpfCnpj(value) {
  const cleanValue = value.replace(/[^\d]+/g, ''); 
  if (cleanValue.length === 11) {
    return (
      cleanValue.substring(0, 3) +
      '.' +
      cleanValue.substring(3, 6) +
      '.' +
      cleanValue.substring(6, 9) +
      '-' +
      cleanValue.substring(9, 11)
    );
  } else if (cleanValue.length === 14) {
    return (
      cleanValue.substring(0, 2) +
      '.' +
      cleanValue.substring(2, 5) +
      '.' +
      cleanValue.substring(5, 8) +
      '/' +
      cleanValue.substring(8, 12) +
      '-' +
      cleanValue.substring(12, 14)
    );
  } else {
    return 'Inválido';
  }
}

function validateCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validateCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    const weights1 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const calcDigit = (slice, weights) => {
        const sum = slice.map((num, idx) => num * weights[idx]).reduce((acc, curr) => acc + curr);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const slice1 = cnpj.slice(0, 12).split('').map(num => parseInt(num));
    const digit1 = calcDigit(slice1, weights1);

    const slice2 = cnpj.slice(0, 13).split('').map(num => parseInt(num));
    const digit2 = calcDigit(slice2, weights2);

    return cnpj.slice(-2) === `${digit1}${digit2}`;
}

module.exports = { formatCpfCnpj, validateCpf, validateCnpj };
