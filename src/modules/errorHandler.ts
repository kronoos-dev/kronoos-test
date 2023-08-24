export class ErrorHandler {
    static handle(error: unknown, message: string): void {
      if (error instanceof Error) { // Faz a verificação de tipo
        console.error(`${message}: ${error.message}`);
      } else {
        console.error(`${message}: ${error}`);
      }
    }
  }
  