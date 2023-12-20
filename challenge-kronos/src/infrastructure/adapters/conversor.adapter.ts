import ConversorError from "../../errors/conversor.error";
import ConversorPort from "../../core/ports/conversor.port";

class ConversorAdapter extends ConversorPort {
    async convertDate(date: string): Promise<Date> {
        try {
            const year = date.substring(0, 4);
            const month = date.substring(4, 6);
            const day = date.substring(6, 8);

            const dateValue = new Date(`${year}-${month}-${day}`);

            if (isNaN(dateValue.getTime())) {
                throw new ConversorError('Data inválida');
            }

            return dateValue;
        } catch (error) {
            throw error;
        }
    }

    async convertValue(value: string): Promise<string> {
        try {
            const numberValue = parseFloat(value);
            if (isNaN(numberValue)) {
                throw new ConversorError('Valor inválido para conversão');
            }

            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(numberValue);
        } catch (error) {
            throw error;
        }
    }
}

export default ConversorAdapter;
