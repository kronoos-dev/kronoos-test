function formatValueFieldMask(rowData, header) {
  const value = rowData[header];
  // Verifica se o nome do campo começa com "vl" e se o valor é um número
  if (header && header.startsWith('vl') && !isNaN(value) && typeof value !== 'boolean') {
    // Converte o valor para um número e arredonda para duas casas decimais
    const roundedValue = Number(Number(value).toFixed(2));  

    if (roundedValue === 0) {
      return 'R$ 0,00';
    }

    const stringValue = roundedValue.toFixed(2).toString();
    const [integerPart, decimalPart] = stringValue.split('.'); // Separa a parte inteira da parte decimal
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona ponto para separar milhares
    const formattedDecimalPart = decimalPart.length === 1 ? `${decimalPart}0` : decimalPart; // Adiciona zero se a casa decimal tiver 1 dígito

    const result =  `R$ ${formattedIntegerPart},${formattedDecimalPart}`; // Adiciona "R$" e vírgula para separar decimais

    if (header && header === 'vlPresta' && isInconsistentvPresta(rowData))  {
      return `${result}(inválido)`
    } 
    return result
   

  } else if (header && header.startsWith('dt') && value.length === 8) {
    // Formata campos de data com prefixo "dt"
    const formattedDate = formatBrazilianDate(value);
    return formattedDate;
    
  }else {
    // Se não for um número, o nome do campo não começar com "vl" ou "dt", ou o valor for zero, retorna o valor sem formatação
    return value;
  }
}

// Função para validar se uma string representa uma data válida
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

// Função para formatar uma data no formato brasileiro (dd/mm/yyyy)
function formatBrazilianDate(dateString) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${day}/${month}/${year}`;
}

// Função para validar CPF ou CNPJ
function isValidCpfCnpj(value) {
  // Lógica de validação de CPF/CNPJ (pode usar uma biblioteca externa para isso)
  if (value.length === 11){
    return isValidCpf(value);
  }
    
  if (value.length === 14){
    return isValidCnpj(value)
  }

}

// Função para validar e estilizar o campo nrCpfCnpj
function validateCpfCnpj(value, cell) {
  if (!isValidCpfCnpj(value)) {    
    return `Documento inválido! (${value})`;
  }

  return value;
}

// Função para validar CPF
function isValidCpf(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/g.test(cpf)) {
    return false;
  }

  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }

  if (rev !== parseInt(cpf.charAt(9))) {
    return false;
  }

  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }

  const result = rev === parseInt(cpf.charAt(10));
  return result;
}

// Função para validar CNPJ
function isValidCnpj(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1+$/g.test(cnpj)) {
    return false;
  }

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) {
    return false;
  }

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return result === parseInt(digits.charAt(1)); 

}

function isInconsistentvPresta(rowData) {
  const vlTotal = parseCurrency(rowData['vlTotal']);
  const qtPrestacoes = parseInt(rowData['qtPrestacoes']);
  const vlPresta = parseCurrency(rowData['vlPresta']);

  // Verificar se a divisão de vlTotal por qtPrestacoes não é igual a vlPresta
  const result = (vlTotal / qtPrestacoes);
  return result !== vlPresta;
}

function parseCurrency(currencyString) {
  // Converte a string de moeda para um número
  return parseFloat(currencyString.replace('R$ ', '').replace(',', '.'));
}

// Função para validar o valor total e as prestações
function validateTotalAndInstallments(rowData, cell) {
  const totalValue = parseFloat(rowData['vlTotal']);
  const installments = parseInt(rowData['qtPrestacoes']);
  const installmentValue = parseFloat(rowData['vlPresta']);

  if (!isNaN(totalValue) && !isNaN(installments) && !isNaN(installmentValue)) {
    const calculatedInstallmentValue = totalValue / installments;

    if (calculatedInstallmentValue !== installmentValue) {
      cell.style.color = 'red'; // Adiciona estilo vermelho ao texto
      return `Erro nos cálculos de prestação!`;
    }
  }

  return '';
}

document.getElementById('csvFileInput').addEventListener('change', handleFile);

function handleFile(event) {
  const file = event.target.files[0];
  const loadingDiv = document.getElementById('loading');
  const outputDiv = document.getElementById('output');

  if (file) {
    loadingDiv.style.display = 'block';

    Papa.parse(file, {
      complete: function(results) {
        loadingDiv.style.display = 'none';
        displayData(results.data);
      },
      header: true,
    });
  }
}


function displayData(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  if (data.length === 0) {
    outputDiv.innerHTML = 'Nenhum dado encontrado no arquivo.';
    return;
  }

  // Criar uma lista de objetos JSON a partir do arquivo importado
  const dataList = data.map(rowData => {
    const formattedRowData = {};
    Object.keys(rowData).forEach(header => {
      formattedRowData[header] = header === 'nrCpfCnpj' ? validateCpfCnpj(rowData[header]) : formatValueFieldMask(rowData, header);
    });
    return formattedRowData;
  });

  // Renderizar a tabela a partir da lista de objetos JSON
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-bordered', 'mt-3');

  const headers = Object.keys(dataList[0]);

  const headerRow = document.createElement('thead');
  const headerRowContent = document.createElement('tr');

  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRowContent.appendChild(th);
  });

  headerRow.appendChild(headerRowContent);
  table.appendChild(headerRow);

  const tbody = document.createElement('tbody');

  dataList.forEach(rowData => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const cell = document.createElement('td');
      cell.textContent = rowData[header];

      // Adicionar estilização em vermelho se o valor contiver 'inválido'
      if (rowData[header].includes('inválido')) {
        cell.style.color = 'red';
      }

      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  outputDiv.appendChild(table);
}

