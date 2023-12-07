import { ConverterController } from './converter.controller';
import { Response } from 'express';

export const createMockResponse = (): Response => {
    const response: Partial<Response> = {};

    response.status = jest.fn().mockReturnValue(response);
    response.send = jest.fn().mockReturnValue(response);
    return response as Response;
};

describe('ConverterController', () => {
    test('should call service.csv2array and send response', async () => {
        const mockCsv2arrayResponse = {
            status: 200,
            response: {
                dataSource: [],
            },
        };

        const mockConverterService = {
            csv2array: jest.fn().mockResolvedValue(mockCsv2arrayResponse),
        };

        const converterController = new ConverterController(mockConverterService as any);

        const mockRequest = {} as any;
        const mockResponse = createMockResponse();

        await converterController.csv2array(mockRequest, mockResponse);

        expect(mockConverterService.csv2array).toHaveBeenCalledWith('./data.csv');

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockCsv2arrayResponse.response);
    });
});