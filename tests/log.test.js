const { logSuccess } = require('../src/utils/logs/logs');

test('Log de sucesso deve ser formatado corretamente', () => {
    const result = logSuccess('Operação concluída com sucesso.');
    expect(result).toBe('\x1b[33m[Kroonos]\x1b[0m Operação concluída com sucesso.');
});


test('Log de sucesso sem mensagem deve ser formatado corretamente', () => {
    const result = logSuccess('');
    expect(result).toBe('\x1b[33m[Kroonos]\x1b[0m ');
});

test('Log de sucesso com caracteres especiais deve ser formatado corretamente', () => {
    const result = logSuccess('Teste com @#$%&* caracteres especiais!');
    expect(result).toBe('\x1b[33m[Kroonos]\x1b[0m Teste com @#$%&* caracteres especiais!');
});
