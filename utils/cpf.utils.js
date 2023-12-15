const factoryNum = require("./other.utils");

function isCPFValid(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf == "") return false;
  if (
    cpf.length != 11 ||
    Array.from(Array(10))
      .map((e, i) => factoryNum(String(i), 11))
      .includes(cpf)
  )
    return false;
  add = 0;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}
module.exports = isCPFValid;
