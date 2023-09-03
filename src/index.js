import ToBRL from "./masks/ToBRL.mask.js";
import Cnpj from "./validators/Cnpjvalidator.js";
import Cpf from "./validators/Cpf.validator.js";

console.log(new ToBRL(123).transform());

console.log(new Cpf(41854274761).isValid());

console.log(new Cnpj(394454624050).isValid());
