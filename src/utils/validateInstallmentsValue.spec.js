import { validateInstallmentsValue } from "./validateInstallmentsValue";

describe('validateInstallmentsValue', () => {
  it('deve retornar falso para valores de prestação e total diferentes', () => {
    const installmentValue = 500;
    const installmentLength = 10;
    const total = 6000;

    const result = validateInstallmentsValue(installmentValue, installmentLength, total);
    expect(result).toBeFalsy();
  });

  it('deve retornar verdadeiro para valores de prestação e total correspondentes', () => {
    const installmentValue = 500;
    const installmentLength = 10;
    const total = 5000;

    const result = validateInstallmentsValue(installmentValue, installmentLength, total);
    expect(result).toBeTruthy();
  });
});