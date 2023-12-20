
const fs = require('fs');
const csvParser = require('csv-parser');
//const csvService = require('src/domain/services/recordService');
const csvtojson = require('csvtojson');

const readCSV = async (caminhoArquivo) => {
  const resultados = [];

  return new Promise((resolve, reject) => {
    fs.readFile(caminhoArquivo, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      // Agora você pode processar os dados
      // por exemplo, dividindo as linhas e processando-as como necessário
      const linhas = data.split('\n');
      linhas.forEach((linha) => {
        // Processar cada linha conforme necessário
        resultados.push(linha);
      });

      resolve(resultados);
    });
  });
}

const lerCSV = async (caminhoArquivo) => {
  const resultados = [];

  return new Promise((resolve, reject) => {
    
    fs.createReadStream(caminhoArquivo)
      .pipe(csvParser())
      .on('data', (linha) => {
        resultados.push(linha);
      })
      .on('end', () => {
        resolve(resultados);
      })
      .on('error', (erro) => {
        reject(erro);
      });
  });
}

const convertCSVtoJSON = (csvFilePath, jsonFilePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvFilePath);

    stream
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // Write the JSON data to a file
        fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });

        // Close the stream
        stream.close();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Funções de validação de CPF e CNPJ
const validarCpf = (cpf) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]/g, '');

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Calcula os dígitos verificadores
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos calculados correspondem aos dígitos reais
  return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
};

const validarCnpj = (cnpj) => {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, '');

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  let peso = 5;
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso;
    peso = peso === 2 ? 9 : peso - 1;
  }

  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  // Verifica se os dígitos calculados correspondem aos dígitos reais
  return digito1 === parseInt(cnpj.charAt(12)) && digito2 === parseInt(cnpj.charAt(13));
};


const formatarValores = (dados) => {
  if (!dados.dtContrato || !dados.dtVctPre) {
    console.error('Erro: As propriedades dtContrato e dtVctPre são obrigatórias.');
    return dados;
  }
  // Formatando valores monetários
  dados.vlTotal = formatCurrency(Number(dados.vlTotal));
  dados.vlPresta = formatCurrency(Number(dados.vlPresta));
  dados.vlMora = formatCurrency(Number(dados.vlMora));
  dados.vlMulta = formatCurrency(Number(dados.vlMulta));
  dados.vlOutAcr = formatCurrency(Number(dados.vlOutAcr));
  dados.vlIof = formatCurrency(Number(dados.vlIof));
  dados.vlDescon = formatCurrency(Number(dados.vlDescon));
  dados.vlAtual = formatCurrency(Number(dados.vlAtual));

  // Dividindo vlTotal pela quantidade de prestações
  const valorPrestacaoCalculado = dados.vlTotal / Number(dados.qtPrestacoes);
  // Verificando se o resultado é igual a vlPresta
  if (valorPrestacaoCalculado !== Number(dados.vlPresta)) {
    //dados.result = "Cálculo de prestação inconsistente.";
    console.error('Erro: Cálculo de prestação inconsistente.');
  }

  // Convertendo dtContrato e dtVctPre para objetos Date
  console.log(dados.dtContrato);
  dados.dtContrato = formatarData(dados.dtContrato.toString());
  dados.dtVctPre = formatarData(dados.dtVctPre.toString());

  return dados;
};

const validarCpfCnpj = (dados) => {
  // Certifique-se de que a propriedade nrCpfCnpj está presente e é uma string
  if (dados.nrCpfCnpj && typeof dados.nrCpfCnpj === 'string') {
    // Verifica se é um CPF ou CNPJ e realiza a validação
    if (dados.nrCpfCnpj.length === 11) {
      // Validação de CPF
      if (!validarCpf(dados.nrCpfCnpj)) {
        console.error('Erro: CPF inválido.');
        // Aqui você pode decidir como lidar com CPF inválido, lançar um erro, retornar false, etc.
      }
    } else if (dados.nrCpfCnpj.length === 14) {
      // Validação de CNPJ
      if (!validarCnpj(dados.nrCpfCnpj)) {
        console.error('Erro: CNPJ inválido.');
        // Aqui você pode decidir como lidar com CNPJ inválido, lançar um erro, retornar false, etc.
      }
    } else {
      console.error('Erro: CPF/CNPJ com formato inválido.');
      // Aqui você pode decidir como lidar com formato inválido, lançar um erro, retornar false, etc.
    }
  } else {
    console.error('Erro: nrCpfCnpj não encontrado ou não é uma string.');
    // Aqui você pode decidir como lidar com a ausência ou tipo incorreto de nrCpfCnpj
  }

  return dados;
};

function formatCurrency(value) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
};

const lerArquivoJSONFormatado = (caminhoArquivo) => {
  try {
    // Lê o conteúdo do arquivo JSON
    const conteudoJSON = fs.readFileSync(caminhoArquivo, 'utf-8');

    // Analisa o conteúdo do arquivo JSON
    const dadosJSON = JSON.parse(conteudoJSON);

    // Formata os dados JSON conforme necessário
    const dadosFormatados = formatarDadosJSON(dadosJSON);

   // await csvService.saveJsonToMongoDB(jsonArray);

    return dadosFormatados;
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    throw error;
  }
};

const formatarDadosJSON = (dadosJSON) => {
  // Adicione aqui qualquer lógica de formatação adicional necessária
  // Pode incluir formatação de datas, valores monetários, etc.

  return dadosJSON;
};

const formatarData = (dataString) => {
  return new Date(dataString.substring(0, 4), dataString.substring(4, 6) - 1, dataString.substring(6, 8));
};


const csvToJson = async (csvFilePath) => {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  return jsonArray;
};

module.exports = {
  readCSV,
  lerCSV,
  convertCSVtoJSON,
  formatarValores,
  validarCpfCnpj,
  lerArquivoJSONFormatado,
  csvToJson,
  // Outras funções do serviço...
};
