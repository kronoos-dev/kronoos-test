import formatDateToISO from '../../../commons/utils/helpers/dateFormatter.js'

describe('Formatting Date', () => {
  it('should return an ISO date to a given string', () => {
    const dateString = '20240212'
    const result = formatDateToISO(dateString)
    expect(result).toEqual(new Date(Date.UTC(2024, 1, 12, 3, 0, 0, 0)))
  })

  it('should return an ISO date to a given string incomplete', () => {
    expect(() => formatDateToISO('2024021')).toThrow('Data inválida')
  })

  it('should throw an error if the string is not passed', () => {
    expect(() => formatDateToISO()).toThrow('Data inválida')
  })
})
