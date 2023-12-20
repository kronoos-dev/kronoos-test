export function getNestedField<T extends object, K extends string>(
  obj: T,
  keys: K
): DeepType<T, K> {
  let result = obj as any;
  for (const key of keys.split(".")) {
    result = result[key];
  }
  return result;
}

export function setNestedField<
  T extends object,
  K extends string,
  V extends DeepType<T, K>
>(obj: T, keys: K, value: V): T {
  const keysArray = keys.split(".");
  const lastIndex = keysArray.length - 1;
  let current: any = obj;

  for (let i = 0; i < lastIndex; i++) {
    const key = keysArray[i];
    if (!(key in current)) {
      current[key] = {} as any;
    }
    current = current[key];
  }

  current[keysArray[lastIndex]] = value;

  return obj;
}

export function formatDateToDDMMYYYY(value: string): string {
  const date = new Date(value);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months start from zero in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatCPForCNPJ(value: string): string {
  const numbersOnly = value.replace(/\D/g, "");

  if (numbersOnly.length <= 11) {
    return formatCPF(numbersOnly);
  } else if (numbersOnly.length === 14) {
    return formatCNPJ(numbersOnly);
  } else {
    return value;
  }
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function validateInstallment(
  vlTotal: number,
  qtPrestacoes: number,
  vlPresta: number
) {
  return Math.abs(vlTotal / qtPrestacoes - vlPresta) < 0.01;
}

export function validateCpf(cpf: string) {
  var cpfRegex = /^(?:(\d{3})(\d{3})(\d{3})(\d{2}))$/;
  if (!cpfRegex.test(cpf)) {
    return false;
  }

  var numeros = cpf.match(/\d/g)!.map(Number);
  var soma = numeros.reduce((acc, cur, idx) => {
    if (idx < 9) {
      return acc + cur * (10 - idx);
    }
    return acc;
  }, 0);

  var resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== numeros[9]) {
    return false;
  }

  soma = numeros.reduce((acc, cur, idx) => {
    if (idx < 10) {
      return acc + cur * (11 - idx);
    }
    return acc;
  }, 0);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== numeros[10]) {
    return false;
  }

  return true;
}

function validateCnpj(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != +digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += +numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != +digitos.charAt(1)) return false;

  return true;
}

export function validateCpfCnpj(value: string) {
  value = value.replace(/[^\d]+/g, "");
  return validateCpf(value) || validateCnpj(value);
}

export function formatCurrency(value: string) {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return currencyFormatter.format(+value / 100);
}
