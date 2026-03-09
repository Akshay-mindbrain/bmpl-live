export default class CustomError<C extends string = string> extends Error {
  public statusCode: number;
  public code?: C;

  constructor({
    message,
    statusCode,
    code,
  }: {
    message: string;
    statusCode: number;
    code?: C;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
