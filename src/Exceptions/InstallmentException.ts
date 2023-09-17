export default class InstallmentException extends Error
{
  constructor(message: string)
  {
    super(message);
    this.name = "InstallmentException";
  }
}