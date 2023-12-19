import { moneyFormat } from "./moneyFormat";

describe("MoneyFormat", ()=> {
    it("should return the currency in Brazilian format (Real R$)", ()=> {
        const value = moneyFormat(29196.96)
        // Assert
        expect(value).toBe("R$\xa029.196,96")
    })
})