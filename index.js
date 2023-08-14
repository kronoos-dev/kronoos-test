import { cpf, cnpj } from 'cpf-cnpj-validator';
import fs from 'fs'
import readline from 'readline'

const line = readline.createInterface({
    input: fs.ReadStream('data.csv')
})

    //Manipulação de Dados de CSV e Conversão para Array
line.on("line", (data) => {
    let csv = data.split(',')

    // console.log(csv);
    
    // //---------------------------------------------
    
    //Conversão de Dados para Moeda Real Brasileira
    const brlFormatter = new Intl.NumberFormat('pt-BR', {
        style: "currency",
        currency: "BRL"
    })
    const vlTotal = parseFloat(csv[8]);
    const vlPresta = parseFloat(csv[18]);
    const vlMora = parseFloat(csv[19]);


    console.log(`O valor total é de: ${brlFormatter.format(vlTotal)}`);
    console.log(`O valor presta é de: ${brlFormatter.format(vlPresta)}`);
    console.log(`O valor mora é de: ${brlFormatter.format(vlMora)}`);
    
    //----------------------------------------------

    //Conversão de data
    const dtContrato = csv[6];
    const dtVctPre = csv[17];
    const convertDate = (date) => {
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const day = date.substring(6, 8)
        return `${day}/${month}/${year}`
    }

    const dtContratoFormatted = convertDate(dtContrato)
    const dtVctPreFormatted = convertDate(dtVctPre)

    console.log(`dtContrato é: ${dtContratoFormatted}`);
    console.log(`dtVctPre é: ${dtVctPreFormatted}`);

    //-------------------------------------------


    //    Validação de Valor Total e Prestações

    const valorTotal = parseFloat(csv[8]);
    const qtPrestacoes = parseInt(csv[7]);
    const valorPresta = parseFloat(csv[18]);
    
    const valorDividido = valorTotal / qtPrestacoes;
    const valorFormatado = valorDividido.toFixed(2); 

    
    if (valorFormatado === valorPresta.toFixed(2)) {
      console.log("Os cálculos estão corretos e consistentes.");
    } else {
      console.log("Os cálculos não correspondem.");
    }


    //  Validação de cpf e cnpj

    const cpfCnpj = csv[4];
    
    if (cpf.isValid(cpfCnpj) || cnpj.isValid(cpfCnpj)) {
        console.log(`CPF ou CNPJ válido: ${cpfCnpj}`);
    } else {
        console.log(`CPF ou CNPJ inválido: ${cpfCnpj}`);
    }

})





