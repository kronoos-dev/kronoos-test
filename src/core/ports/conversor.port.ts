abstract class ConversorPort {
    abstract convertDate(date: string): Promise<Date>;
    abstract convertValue(value: string): Promise<string>;
}

export default ConversorPort;