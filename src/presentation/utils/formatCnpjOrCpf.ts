export const formatCPF = (cpf: string): string => {
  const numericCPF = cpf.replace(/\D/g, '')

  if (numericCPF.length !== 11) {
    throw new Error('Invalid CPF length')
  }

  return numericCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatCNPJ = (cnpj: string): string => {
  const numericCNPJ = cnpj.replace(/\D/g, '')

  if (numericCNPJ.length !== 14) {
    throw new Error('Invalid CNPJ length')
  }

  return numericCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export const formatCnpjOrCpf = (document: string) => {
  const numericDocument = document.replace(/\D/g, '')
  if (numericDocument.length === 11) {
    return formatCPF(document)
  } else if (numericDocument.length === 14) {
    return formatCNPJ(document)
  } else {
    return document
  }
}
