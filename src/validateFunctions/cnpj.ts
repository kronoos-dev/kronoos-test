export default class Cnpj {
  value: string;

  constructor(readonly cnpj: string) {
    if (!this.validate(cnpj)) this.value = `Invalid CNPJ ${cnpj}`;
    else this.value = cnpj;
  }

  isValidLength(cnpj: string) {
    return cnpj.length !== 14;
  }

  allDigitsTheSame(cnpj: string) {
    return cnpj.split("").every((c) => c === cnpj[0]);
  }

  removeNonDigits(cnpj: string) {
    return cnpj.replace(/\D/g, "");
  }

  validate(cnpj: string) {
    cnpj = this.removeNonDigits(cnpj);
    if (this.isValidLength(cnpj)) return false;
    if (this.allDigitsTheSame(cnpj)) return false;
    return true;
  }
}
