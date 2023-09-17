import { DateTime } from "luxon";

import DateException from "../Exceptions/DateException";

export function toJSDate(date: string): Date
{
    const luxonDate = DateTime.fromFormat(date, 'yyyyMMdd');
    if(!luxonDate.isValid) throw new DateException(`Formato da data inválido. O formato correto é yyyymmdd. Data inserida: ${date}`);
    
    return luxonDate.toJSDate();
}