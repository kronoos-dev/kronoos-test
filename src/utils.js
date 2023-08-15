export const convertToBRCurrency = (number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(number)
}

export const isValidCPF = (cpf) => {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = sum % 11;
  let digit1 = (remainder < 2) ? 0 : 11 - remainder;

  if (parseInt(cpf.charAt(9)) !== digit1) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = sum % 11;
  let digit2 = (remainder < 2) ? 0 : 11 - remainder;

  if (parseInt(cpf.charAt(10)) !== digit2) {
    return false;
  }

  return true;
}

export const isValidCNPJ = (cnpj) => {
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

  if (result !== parseInt(digits.charAt(1))) {
    return false;
  }

  return true;
}

export const convertToDate = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return new Date(`${year}-${month}-${day}`);
}

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
export const checkTotalConsistent = (vlTotal, qtPrestacoes, vlPresta) => {
	const totalByPresta = (vlTotal / qtPrestacoes).toFixed(2);
	const vlPrestaNum = parseFloat(vlPresta).toFixed(2)

	return totalByPresta === vlPrestaNum ? true : false;
}