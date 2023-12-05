const { verifyIfFileExists } = require('../src/utils/validator/dataSource');

const pathToFile = '../src/data/data.csv';

test('Verificar se o arquivo não existe (lança erro)', () => {
  expect(() => verifyIfFileExists(pathToFile)).toThrowError(`O arquivo de data source não existe! Verifique se está no diretório especificado: ${pathToFile}`);
});

const pathToDirectory = '../src/data/';

test('Verificar se o caminho aponta para um diretório (lança erro)', () => {
  expect(() => verifyIfFileExists(pathToDirectory)).toThrowError(`O arquivo de data source não existe! Verifique se está no diretório especificado: ${pathToDirectory}`);
});

const emptyPath = '';

test('Verificar se o caminho está vazio (lança erro)', () => {
  expect(() => verifyIfFileExists(emptyPath)).toThrowError('O arquivo de data source não existe! Verifique se está no diretório especificado: ');
});

const invalidPath = null;

test('Verificar se o caminho é inválido (lança erro)', () => {
  expect(() => verifyIfFileExists(invalidPath)).toThrowError('O arquivo de data source não existe! Verifique se está no diretório especificado: null');
});
