# Teste de vaga fullstack _KRONOOS_

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

Certifique-se de testar cada etapa do processo para garantir que os dados sejam manipulados, convertidos e validados corretamente de acordo com os cenários especificados.

<hr />
<br />
<br />
<br />

# Execução do projeto

## Por docker

- E necessário ter o docker instalado - [Documentação do docker](https://docs.docker.com/get-docker/)
- Entrar na raiz do projeto.
- Executar o comando: docker compose -f "docker-compose.yml" up -d --build.
- Abrir o navegador e ir ao [Localhost](http://localhost:3000).
- Quando aparecer a mensagem no navegador acessa a url [localhost/api/](http://localhost:3000/api)

## Sem o docker

- É necessário ter o node e o npm instalado: [Documentação do node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- Após o node e o NPM instalado executar o comando na raiz do projeto: npm i
- Após fazer toda a instalação executar o comando:
  - npm run start (caso seja produção)
  - npm run dev (caso seja desenvolvimento)
