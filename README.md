# Teste de vaga fullstack _KRONOOS_

### Autor: [Gabriel Augusto](https://biew.dev)

## Como usar

```
npm run build
```

ou

```
yarn build
```

Após isso podemos executar o codigo de exemplo:

```
yarn example
```

## Sobre o código

A funcão principal do projeto é o `getCsvData` que tem essa estrutura `getCsvData(csvFile, options)`

> **csvFile** - Caminho do arquivo .csv

> **options** - Opções de processamento do arquivo:

```typescript
{
    formatCurrency?: boolean;
    syncInstallments?: boolean;
    formatCpfCnpj?: boolean;
}
```

## Exemplo:

```typescript
getCsvData('./data/data.csv', {
  formatCurrency: true,
  formatCpfCnpj: true,
  syncInstallments: true,
})
  .then(csv => {
    console.log('csv', csv);
  })
  .catch(error => {
    console.log('Error', error);
  });
```

### retorno esperado:

```typescript
[
...
{
    nrInst: 31,
    nrAgencia: 16,
    cdClient: 28843,
    nmClient: 'CLIENTE 20',
    nrCpfCnpj: '792608117956',
    nrContrato: 403261,
    dtContrato: 2023-01-18T00:00:00.000Z,
    qtPrestacoes: 10,
    vlTotal: 'R$ 40.370,20',
    cdProduto: 1276,
    dsProduto: 'CDC PESSOA JURIDICA',
    cdCarteira: 14,
    dsCarteira: 'CRÉDITO DIRETO AO CONSUMIDOR',
    nrProposta: 179643,
    nrPresta: 8,
    tpPresta: 'Original',
    nrSeqPre: 0,
    dtVctPre: 2022-04-27T00:00:00.000Z,
    vlPresta: 'R$ 4.037,02',
    vlMora: 'R$ 58.973,16',
    vlMulta: 'R$ 2.450,67',
    vlOutAcr: 'R$ 0,00',
    vlIof: 'R$ 0,00',
    vlDescon: 'R$ 0,00',
    vlAtual: 'R$ 104.156,81',
    idSituac: 'Aberta',
    idSitVen: 'Vencida',
    invalidCpfCnpj: true
  },
...
]
```
