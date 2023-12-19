import { isValidCnpjOrCpf } from "./calidCpfOrCnpj";

describe("CalidCpfOrCnpj", ()=> {
    it.each(["41854274761", "11223344556677"])("should return false when cpf or cnpj is invalid", (cpf_cnpj)=> {
        const isValid = isValidCnpjOrCpf(cpf_cnpj)
        // Assert
        expect(isValid).toBeFalsy()
    })

    it.each(["79135538473", "23077704000168"])("should return truthy when cpf or cnpj is valid", (cpf_cnpj)=> {
        const isValid = isValidCnpjOrCpf(cpf_cnpj)
        // Assert
        expect(isValid).toBeTruthy()
    })


    it.each(["0123456789", "012345678901234"])("should return falsy when cpj or cnpj length is invalid", (cpf_cnpj)=> {
        const isValid = isValidCnpjOrCpf(cpf_cnpj)
        
        // Assert
        expect(isValid).toBeFalsy()
    })
    
})