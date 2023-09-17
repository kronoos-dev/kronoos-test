export default class DateException extends Error
{
  constructor(message: string)
  {
    super(message);
    this.name = "DateException";
  }
}