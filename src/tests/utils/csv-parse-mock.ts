interface ClientContractMock {
  [key: string]: string
}
export class CSVParseMock{
  static transform(source: string){
    const lines = source.trim().split('\n');
    const headers = lines[0].split(',');
    
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as ClientContractMock);
  });
  }
}