import fs from 'fs';
import csvParser from 'csv-parser';

// Conversão de Dados para Moeda Real Brasileira
const conversaoReal = valor => {
  let numero = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);

  return numero
}

// Validação de CPF
const validarCPF = cpf => {

  // remove pontuação, se houver
  cpf = cpf.replace(/[^\d]+/g, '');

  // verifica n de dígitos (11)
  if (cpf.length !== 11) return false;

  let sum = 0;
  let remainder;

  // soma ponderada 9 dígitos
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  // valor intermediário
  remainder = (sum * 10) % 11;

  // se vi for 10 ou 11, o primeiro dígito verificador é 0; senão é o próprio vi
  if (remainder === 10 || remainder === 11) remainder = 0;

  // compara primeiro dígito verificador
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    // soma ponderada de 10 dígitos
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  // valor intermediário para segundo dígito
  remainder = (sum * 10) % 11;

  // se vi for 10 ou 11, o segundo dígito verificador é 0; senão é o próprio vi
  if (remainder === 10 || remainder === 11) remainder = 0;

    // compara segundo dígito verificador
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}

// Validação de CNPJ
const validarCNPJ = cnpj => {

  // remove pontuação, se houver
  cnpj = cnpj.replace(/[^\d]+/g, '');

  // verifica n de dígitos (14)
  if (cnpj.length !== 14) return false;

  // verifica dígitos repetidos
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let sum = 0;
  let factor = 5;

  // soma ponderada 12 dígitos
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    // os 12 dígitos tem pesos que variam de 5 a 2 e 9 a 2
    factor = factor === 2 ? 9 : factor - 1;
  }

  // primeiro dígito verificador
  let remainder = sum % 11;
  let firstVerifier = remainder < 2 ? 0 : 11 - remainder;

  // compara primeiro dígito verificador
  if (parseInt(cnpj.charAt(12)) !== firstVerifier) return false;

  sum = 0;
  factor = 6;

  // soma ponderada de 13 dígitos (incluindo o primeiro dígito verificador)
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    // os 13 dígitos tem pesos que variam de 6 a 2 e 9 a 2
    factor = factor === 2 ? 9 : factor - 1;
  }

  // segundo dígito verificador
  remainder = sum % 11;
  let secondVerifier = remainder < 2 ? 0 : 11 - remainder;

  // compara segundo dígito verificador
  return parseInt(cnpj.charAt(13)) === secondVerifier;
}

// Validação de Valor Total e Prestações
const validarPrest = (vlPrest, qPrest, vlTotal) => {
  return vlPrest * qPrest === vlTotal;
}

// Conversão de Datas para o Tipo Date
const conversaoDate = num => {
  const dateFormat = `${num.slice(0, 4)}-${num.slice(4, 6)}-${num.slice(6, 8)}`;
  return new Date(dateFormat);
}

const results = [];

fs.createReadStream('data.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    const originalRow = { ...row };

    // verifica cpf/cnpj
    row.validaCpfCnpj = validarCPF(row.nrCpfCnpj) || validarCNPJ(row.nrCpfCnpj);

    // verifica prestações
    row.validaPrest = validarPrest( row.vlPresta, row.qtPrestacoes, row.vlTotal)

    // conversão data
    row.dtContrato = conversaoDate(row.dtContrato)
    row.dtVctPre = conversaoDate(row.dtVctPre)

    // conversão real 
    row.vlTotal = conversaoReal(row.vlTotal);
    row.vlPresta = conversaoReal(row.vlPresta);
    row.vlMora = conversaoReal(row.vlMora);
    row.vlMulta = conversaoReal(row.vlMulta);
    row.vlOutAcr = conversaoReal(row.vlOutAcr);
    row.vlIof = conversaoReal(row.vlIof);
    row.vlDescon = conversaoReal(row.vlDescon);
    row.vlAtual = conversaoReal(row.vlAtual);

    results.push(row);

    // console.log('Linha Original:', originalRow, 'Linha Modificada:', row);
  })
  .on('end', () => {
    console.log(results);
  });