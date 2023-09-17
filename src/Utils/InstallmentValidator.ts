import InstallmentException from "../Exceptions/InstallmentException";

export function validateInstallment(total: number, installments: number, installmentValue: number): void
{
  // round up to 2 decimal points
  const roundedUp = Math.ceil(total / installments * 100) / 100;

  if(roundedUp !== installmentValue) throw new InstallmentException(`Valor das prestações não condiz com a divisão do total pelo número de prestações. Total: ${total}, Quantidade de Prestações: ${installments}, Valor da Prestação: ${installmentValue}.`);
}