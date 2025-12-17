// Una pequeña clase para manejar errores personalizados con status y un mensaje como en Nest con httpException por ej.
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}