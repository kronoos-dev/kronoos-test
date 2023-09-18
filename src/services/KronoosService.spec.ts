import { KronoosService } from './KronoosService';
import { isDocumentValid } from '../utils/validateDocument';
import { isInstallmentValid } from '../utils/validateInstallment';

// Should mock isDocumentValid function
jest.mock('../utils/validateDocument', () => {
  return { isDocumentValid: jest.fn().mockReturnValue(true) };
});

jest.mock('../utils/formatDate', () => {
  return { formatDate: jest.fn().mockReturnValue(new Date()) };
});

jest.mock('../utils/formatCurrency', () => {
  return { formatCurrency: jest.fn().mockReturnValue('R$ 1000,00') };
});

jest.mock('../utils/validateInstallment', () => {
  return { isInstallmentValid: jest.fn().mockReturnValue(true) };
});

describe('KronoosService', () => {
  let sut: KronoosService;

  beforeEach(() => {
    sut = new KronoosService();
  });

  describe('formatData', () => {
    it('should invalidate document if is invalid', () => {
      const csvData = { 
        nrCpfCnpj: 'invalid_document',
        dtVctPre: '20210101',
        dtContrato: '20210101',
        vlTotal: '1000',
        qtPrestacoes: '10',
        vlPresta: '100',
      } as any;
      (isDocumentValid as jest.Mock).mockReturnValueOnce(false);

      const result = sut.formatData([csvData]);
      expect(result[0].nrCpfCnpj).toBe('Documento inválido');
    })

    it('should be able to validate document if is valid', () => {
      const csvData = { 
        nrCpfCnpj: 'valid_document',
        dtVctPre: '20210101',
        dtContrato: '20210101',
        vlTotal: '1000',
        qtPrestacoes: '10',
        vlPresta: '100',
      } as any;

      const result = sut.formatData([csvData]);
      expect(result[0].nrCpfCnpj).toBe('valid_document');
    })

    it('should be able to transform date string to date object', () => {
      const csvData = { 
        nrCpfCnpj: 'valid_document',
        dtVctPre: '20210101',
        dtContrato: '20210101',
        vlTotal: '1000',
        qtPrestacoes: '10',
        vlPresta: '100',
      } as any;

      const result = sut.formatData([csvData]);
      expect(result[0].dtVctPre).toBeInstanceOf(Date);
      expect(result[0].dtContrato).toBeInstanceOf(Date);
    });

    it('should change vlPresta to error message if vlPresta is invalid', () => {
      const csvData = { 
        nrCpfCnpj: 'valid_document',
        dtVctPre: '20210101',
        dtContrato: '20210101',
        vlTotal: '1000',
        qtPrestacoes: '10',
        vlPresta: '100',
      } as any;
      (isInstallmentValid as jest.Mock).mockReturnValueOnce(false);

      const result = sut.formatData([csvData]);

      expect(result[0].vlPresta).toBe('O campo vlTotal dividido por qtPrestacoes não é igual ao campo vlPresta.');
    });

    it('should format all fields that starts with "vl" to currency', () => {
      const csvData = { 
        nrCpfCnpj: 'valid_document',
        dtVctPre: '20210101',
        dtContrato: '20210101',
        vlTotal: '1000',
        qtPrestacoes: '10',
        vlPresta: '100',
      } as any;

      const result = sut.formatData([csvData]);

      expect(result[0].vlTotal).toBe('R$ 1000,00');
      expect(result[0].vlPresta).toBe('R$ 1000,00');
    });
  });

});