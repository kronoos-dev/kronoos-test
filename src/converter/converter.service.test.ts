import { ConverterService } from './converter.service';

describe('ConverterService', () => {
    test('should convert CSV to array', async () => {
        const converterService = new ConverterService();
        const result = await converterService.csv2array('./tests/dataSample.csv');

        expect(result).toEqual({
            status: 200,
            response: {
                dataSource: expect.any(Array),
            },
        });
    });

    test('should handle file not found error', async () => {
        const converterService = new ConverterService();

        try {
            await converterService.csv2array('fake/path/filename.csv');
        } catch (error) {
            expect(error).toEqual({
                status: 422,
                response: {
                    errorMsg: expect.any(String),
                },
            });
        }
    });
});