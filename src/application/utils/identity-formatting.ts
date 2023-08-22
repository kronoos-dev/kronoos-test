export class IdentiyFormmating{
  static transformCPF(value: string){
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }
  static transformCNPJ(value: string){
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  static checkAndTransform(value: string){
    const SIZE_NUMBER = value.length
    switch(SIZE_NUMBER){
      case 10:
      return IdentiyFormmating.transformCPF(value.padStart(11,'0'))
      case 11:
        return IdentiyFormmating.transformCPF(value)
      case 13:
        return IdentiyFormmating.transformCNPJ(value.padStart(14,'0'))
      case 14:
        return IdentiyFormmating.transformCNPJ(value)
      default:
        return value
    }
  }
  static checkValid(value: string){
    const SIZE_NUMBER = value.length
    if(SIZE_NUMBER >= 10 && SIZE_NUMBER <= 14 ){
      return 'Válido'
    }
    return 'Inválido'
  }
}