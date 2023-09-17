import { AxiosError } from 'axios';

export interface AxiosCustomError extends AxiosError {
    error: string;
    message: string;
    statusCode: number;
}
