import { cnpj, cpf } from 'cpf-cnpj-validator';

export const isDocumentValid = (document: string): boolean => {
  if (document.length === 11) return cpf.isValid(document);
  if (document.length === 14) return cnpj.isValid(document);
  return false;
}