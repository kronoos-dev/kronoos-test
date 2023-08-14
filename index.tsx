const { LeitorArquivos } = require('./src/Leitor/LeitorArquivos');

const leitor = new LeitorArquivos();
leitor.lerArquivoCSV('./src/arquivos/data.csv'); 
