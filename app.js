const csv = require('csv-parser');
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000
const filepath = "./data.csv"
const fileData = []

// FORMATA MOEDA PARA BLR COM R$
function formatMoney(value, local, type, symbol){
    // RECEBE OS PARAMETROS DA MOEDA E FORMATA PARA O SIMBOLO INDICADO
    return new Intl.NumberFormat(local, { style: 'currency', currency: type }).format(value).replace(type, symbol);
}

// FORMATA E VALIDA CPF OU CNPJ
function formatCnpjCpf(value){
  value = value.replace(/\D/g, "");
  // VERIFICA SE É CPF OU CNPJ
  if (value.length === 11) {
    // APLICA MASKARA CPF
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  } else if(value.length === 14) {
    // APLICA MASKARA CNPJ
    value = value.replace(/^(\d{2})(\d)/, "$1.$2")
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2")
    value = value.replace(/(\d{4})(\d)/, "$1-$2")
  } else {
    value = "DOCUMENTO INVÁLIDO"
  }

  return value;
}

// VERIFICA VALOR DAS PRESTAÇÕES SOBRE O VALOR TOTAL
function checkPrice(total, parcelas){
    const newValue = parseInt(total) / parseInt(parcelas);
    return formatMoney(String(newValue), 'pt-BR', 'BLR', 'R$');
}

// FORMATA E CONVERTE AS DATAS 
function formatDate(date){
    return date.replace(
        /(\d\d)(\d\d)\d\d(\d\d)/, '$1/$2/$3'
    );
}


fs.createReadStream(filepath)
    .pipe(csv())
    .on('data', (row) => {
        // PARCELAS
        row.vlPresta = checkPrice(row.vlTotal, row.qtPrestacoes)
        // MOEDAS
        row.vlTotal = formatMoney(row.vlTotal, 'pt-BR', 'BLR', 'R$')
        row.vlMora = formatMoney(row.vlMora,'pt-BR', 'BLR', 'R$')
        // DOCUMENTO
        row.nrCpfCnpj = formatCnpjCpf(row.nrCpfCnpj)
        // DATAS
        row.dtContrato = formatDate(row.dtVctPre)
        row.dtVctPre = formatDate(row.dtVctPre)
        fileData.push(row)
        console.log('Convertendo...')
    })

    .on('end', () => {
        fs.writeFileSync('data.json', JSON.stringify(fileData, null, 2));    
        console.log("Conversão concluída!")  
        app.listen(port, () => {
            console.log(`Acesse a aplicação em: http://localhost:${port}`)
        })
    })

    .on('error', () => {
        console.log("Erro na conversão");
    })

    /* ENPOINT COM OS DADOS CONVERTIDOS */
    app.get('/', (req, res) => {
        res.json(fileData)
    })

    