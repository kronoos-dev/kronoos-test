import DocumentException from "../Exceptions/DocumentException";

export function validateDocument(document: string): void
{
  if(!isValidCPF(document) && !isValidCNPJ(document)) throw new DocumentException(`Documento (CPF/CNPJ) inserido não é válido: ${document}`);
}

function isValidCNPJ(cpf: string): boolean
{
  const numbers = stringToNumberArray(cpf);

  if(numbers.length !== 14) return false;

  const [lastDigit, firstDigit, ...base] = numbers.reverse();

  if(firstDigit !== calculateDigitSumCNPJ(base)) return false;

  if(lastDigit !== calculateDigitSumCNPJ([firstDigit, ...base])) return false;
  
  return true;
}

function stringToNumberArray(value: string): number[]
{
  return [...value.replace(/\D/g, '')].map(Number);
}

function calculateDigitSumCNPJ(baseDigits: number[]): number
{
  const digitSum = baseDigits.reduce((acc, digit, idx) => acc + (idx % 8 + 2) * digit, 0);

  const result = digitSum % 11;

  return result < 2 ? 0 : 11 - result;
}

function isValidCPF(cpf: string): boolean
{
  const numbers = stringToNumberArray(cpf);
  
  if(numbers.length !== 11) return false;
  if(numbers.every(number => number === numbers[0])) return false; // retorna falso se todos os numeros do CPF foram iguais (Ex.: 111.111.111-11), pois é inválido e passa na lógica abaixo.

  const [lastDigit, firstDigit, ...base] = numbers.reverse();

  if(firstDigit !== calculateDigitSumCPF(base)) return false;

  if(lastDigit !== calculateDigitSumCPF([firstDigit, ...base])) return false;

  return true;
}

function calculateDigitSumCPF(baseDigits: number[]): number
{
  const digitSum = baseDigits.reduce((acc, digit, idx) => acc + (idx + 2) * digit, 0);

  const result = digitSum * 10 % 11;

  return result > 9 ? 0 : result;
}