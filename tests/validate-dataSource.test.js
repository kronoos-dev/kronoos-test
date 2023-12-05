const { verifyIfFileExists } = require('../src/utils/validator/dataSource');

test('Verificar se o arquivo não existe (lança erro)', () => {
    const pathToFile = 'caminho/do/arquivo/inexistente.txt';
    expect(() => verifyIfFileExists(pathToFile)).toThrowError(`O arquivo de data source não existe! Verifique se está no diretório especificado: ${pathToFile}`);
});

test('Verificar se o caminho aponta para um diretório (lança erro)', () => {
    const pathToDirectory = 'caminho/do/diretorio/';
    expect(() => verifyIfFileExists(pathToDirectory)).toThrowError(`O arquivo de data source não existe! Verifique se está no diretório especificado: ${pathToDirectory}`);
});

test('Verificar se o caminho está vazio (lança erro)', () => {
    const emptyPath = '';
    expect(() => verifyIfFileExists(emptyPath)).toThrowError('O arquivo de data source não existe! Verifique se está no diretório especificado: ');
});

test('Verificar se o caminho é inválido (lança erro)', () => {
    const invalidPath = null; // ou qualquer outro valor inválido
    expect(() => verifyIfFileExists(invalidPath)).toThrowError('O arquivo de data source não existe! Verifique se está no diretório especificado: null');
});