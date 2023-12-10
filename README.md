# Desafio *KRONOOS*

## Como rodar este app:

- Certifique-se de estar utilizando a versão adequada do node para este projeto (node v20.10.0). Caso utilize o NVM como gestor de versão do node, apenas rode o comando:

```bash
$ nvm use
```

- Instale as dependencias do projeto:

```bash
$ npm install
```

- Para rodar o projeto, execute o script `start`:

```bash
$ npm run start
```

## Testes

Foram feitos testes para os formatadores e validadores. Para executar os testes, certifique-se que as dependências foram instaladas e execute:

```bash
$ npm test
```

## Resultados esperados:

O app irá ler o arquivo `data.csv` na raiz do projeto e printar os dados formatados como um array de objetos. Ao fazer o mapeamento, o app também irá verificar se os dados especificados no desafio são válidos, e caso não seja, irá inserir um campo `rowErrors`.
O `rowErrors` contém um array de strings com o nome dos campos que estão com erro naquela linha e uma mensagem com mais detalhes sobre o erro.

Segue exemplo de uma linha do CSV transformada em objeto:
```
{
  nrInst: '533',
  nrAgencia: '32',
  cdClient: '56133',
  nmClient: 'CLIENTE 1',
  nrCpfCnpj: '418.542.747-61',
  nrContrato: '733067',
  dtContrato: 2022-12-27T03:00:00.000Z,
  qtPrestacoes: 5,
  vlTotal: 'R$ 83.720,19',
  cdProduto: '777',
  dsProduto: 'CDC PESSOA JURIDICA',
  cdCarteira: '17',
  dsCarteira: 'CRÉDITO DIRETO AO CONSUMIDOR',
  nrProposta: '798586',
  nrPresta: '2',
  tpPresta: 'Original',
  nrSeqPre: '0',
  dtVctPre: 2022-04-06T03:00:00.000Z,
  vlPresta: 'R$ 17.524,03',
  vlMora: 'R$ 29.196,96',
  vlMulta: '536.4',
  vlOutAcr: '0',
  vlIof: '0',
  vlDescon: '0',
  vlAtual: '47257.39',
  idSituac: 'Aberta',
  idSitVen: 'Vencida',
  rowErrors: [
    { field: 'vlPresta', error: 'O valor da prestação está incorreto' }
  ]
}
```
 
Ao fim, o app irá printar todo o array de dados formatados e com as marcações de erros.

## Requisitos e instruções do desafio:
### Manipulação de Dados de CSV e Conversão para Array

- Os dados são fornecidos em formato CSV.
- Utilizaremos a biblioteca `fs` (File System) para ler o arquivo CSV e a biblioteca `csv-parser` para processar os dados e convertê-los em um array de objetos JavaScript.

### Conversão de Dados para Moeda Real Brasileira

- Valores monetários, como `vlTotal`, `vlPresta`, `vlMora`, etc., precisam ser formatados como moeda brasileira (BRL).
- Utilizaremos a biblioteca `intl` do JavaScript para formatar os valores numéricos como moeda BRL, incluindo o símbolo de real (R$), separador de milhar e precisão de duas casas decimais.

### Validação de CPF ou CNPJ

- Implementaremos uma função para validar o campo `nrCpfCnpj` e verificar se ele é um CPF ou CNPJ válido, seguindo as regras de validação apropriadas para cada formato.

### Validação de Valor Total e Prestações

- Dividiremos o valor de `vlTotal` pela quantidade de prestações (`qtPrestacoes`).
- Verificaremos se o resultado dessa divisão é igual ao valor de `vlPresta` para cada prestação, garantindo que os cálculos estejam corretos e consistentes.

### Conversão de Datas para o Tipo Date

- Os campos `dtContrato` e `dtVctPre` estão no formato `YYYYMMDD`.
- Utilizaremos o JavaScript para converter esses campos em objetos do tipo `Date`, permitindo manipulações e formatações mais adequadas.

Certifique-se de testar cada etapa do processo para garantir que os dados sejam manipulados, convertidos e validados corretamente de acordo com os cenários especificados.