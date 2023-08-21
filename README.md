# Teste de vaga fullstack *KRONOOS*

## Manipulação de Dados de CSV e Conversão para Array

- Os dados são fornecidos em formato CSV.
- Utilizaremos a biblioteca `fs` (File System) para ler o arquivo CSV e a biblioteca `csv-parser` para processar os dados e convertê-los em um array de objetos JavaScript.

## Conversão de Dados para Moeda Real Brasileira

- Valores monetários, como `vlTotal`, `vlPresta`, `vlMora`, etc., precisam ser formatados como moeda brasileira (BRL).
- Utilizaremos a biblioteca `intl` do JavaScript para formatar os valores numéricos como moeda BRL, incluindo o símbolo de real (R$), separador de milhar e precisão de duas casas decimais.

## Validação de CPF ou CNPJ

- Implementaremos uma função para validar o campo `nrCpfCnpj` e verificar se ele é um CPF ou CNPJ válido, seguindo as regras de validação apropriadas para cada formato.

## Validação de Valor Total e Prestações

- Dividiremos o valor de `vlTotal` pela quantidade de prestações (`qtPrestacoes`).
- Verificaremos se o resultado dessa divisão é igual ao valor de `vlPresta` para cada prestação, garantindo que os cálculos estejam corretos e consistentes.

## Conversão de Datas para o Tipo Date

- Os campos `dtContrato` e `dtVctPre` estão no formato `YYYYMMDD`.
- Utilizaremos o JavaScript para converter esses campos em objetos do tipo `Date`, permitindo manipulações e formatações mais adequadas.

Certifique-se de testar cada etapa do processo para garantir que os dados sejam manipulados, convertidos e validados corretamente de acordo com os cenários especificados.# kronoos


## Aplicativo de Processamento e Validação de Dados
Este aplicativo processa dados de um arquivo CSV, realiza várias validações nos dados e exporta os resultados para outro arquivo CSV.

Índice
Descrição
Instalação
Uso
Estrutura de Arquivos
Licença
Descrição
Este aplicativo lê dados de um arquivo CSV, realiza validações, incluindo validação de CPF e CNPJ, cálculo de prestações e conversão de datas. Os dados processados juntamente com os resultados das validações e as datas transformadas são então exportados para um arquivo CSV de saída.

## Instalação
Clone o repositório para sua máquina local:


git clone https://github.com/seu-nome-de-usuário/aplicativo-processamento-dados.git
Instale as dependências necessárias:

cd aplicativo-processamento-dados
npm install
Coloque seu arquivo CSV de entrada com o nome data.csv no diretório raiz.

Abra o terminal e navegue até o diretório do projeto:


cd caminho/para/aplicativo-processamento-dados
Execute o aplicativo:


node main.js
O aplicativo irá processar os dados do data.csv, realizar as validações e exportar os resultados para o arquivo output.csv.

Estrutura de Arquivos
O aplicativo está estruturado da seguinte forma:


aplicativo-processamento-dados/
├── cpfValidation.js
├── cnpjValidation.js
├── prestationsValidation.js
├── dateConversion.js
├── main.js
├── data.csv
├── output.csv
├── node_modules/
├── package.json
└── README.md

cpfValidation.js: Contém a função de validação de CPF.
cnpjValidation.js: Contém a função de validação de CNPJ.
prestationsValidation.js: Contém a função de validação de prestações.
dateConversion.js: Contém a função de conversão de datas.
main.js: Script principal que lê, processa, valida e exporta os dados.
data.csv: Arquivo CSV de entrada contendo os dados a serem processados.
output.csv: Arquivo CSV exportado contendo os dados processados e os resultados das validações.
Licença
Este projeto está licenciado sob a Licença MIT.