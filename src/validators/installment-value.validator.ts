type Context = {
    installments: number, 
    total: number, 
    installmentValue: number,
}

export const isInstallmentValueValid = (context: Context) => {
    const installmentValue = context.total / context.installments
    return installmentValue === context.installmentValue
}