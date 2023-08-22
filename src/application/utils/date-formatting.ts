import dayjs from "dayjs";

export class DateFormatting {
  static transformFromStringToDate(date: string){
    return new Date(dayjs(date).format('YYYY-MM-DD'))
  }
}