import convertStringNumberToBRL from "../../../src/infrastructure/data/convert-string-number-to-brl";

describe("convertStringNumberToBRL", ()=> {
    test('should format string number to BR BRL currency', () => {
        expect(convertStringNumberToBRL('77238.37')).toBe('R$\xa077.238,37');
        expect(convertStringNumberToBRL('1000')).toBe('R$\xa01.000,00');
        expect(convertStringNumberToBRL('999')).toBe('R$\xa0999,00');
        expect(convertStringNumberToBRL('99')).toBe('R$\xa099,00');
        expect(convertStringNumberToBRL('99.99')).toBe('R$\xa099,99');
        expect(convertStringNumberToBRL('9.99')).toBe('R$\xa09,99');
      });
})