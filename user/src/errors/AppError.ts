import CustomError from "./CustomError";

export default class AppError {
  // --- 4xx Client Errors ---

  static badRequest(message: string) {
    return new CustomError({ message, statusCode: 400, code: "ERR_VALID" });
  }

  static unauthorized(message: string) {
    return new CustomError({ message, statusCode: 401, code: "ERR_AUTH" });
  }

  static paymentRequired(message: string) {
    return new CustomError({ message, statusCode: 402, code: "ERR_VALID" });
  }

  static forbidden(message: string) {
    return new CustomError({ message, statusCode: 403, code: "ERR_FORBIDDEN" });
  }

  static notFound(message: string) {
    return new CustomError({ message, statusCode: 404, code: "ERR_NF" });
  }

  static methodNotAllowed(message: string) {
    return new CustomError({ message, statusCode: 405, code: "ERR_VALID" });
  }

  static notAcceptable(message: string) {
    return new CustomError({ message, statusCode: 406, code: "ERR_VALID" });
  }

  static proxyAuthRequired(message: string) {
    return new CustomError({ message, statusCode: 407, code: "ERR_AUTH" });
  }

  static requestTimeout(message: string) {
    return new CustomError({ message, statusCode: 408, code: "ERR_TIMEOUT" });
  }

  static conflict(message: string) {
    return new CustomError({ message, statusCode: 409, code: "ERR_CONFLICT" });
  }

  static gone(message: string) {
    return new CustomError({ message, statusCode: 410, code: "ERR_NF" });
  }

  static lengthRequired(message: string) {
    return new CustomError({ message, statusCode: 411, code: "ERR_VALID" });
  }

  static preconditionFailed(message: string) {
    return new CustomError({ message, statusCode: 412, code: "ERR_VALID" });
  }

  static payloadTooLarge(message: string) {
    return new CustomError({ message, statusCode: 413, code: "ERR_LIMIT" });
  }

  static uriTooLong(message: string) {
    return new CustomError({ message, statusCode: 414, code: "ERR_VALID" });
  }

  static unsupportedMediaType(message: string) {
    return new CustomError({
      message,
      statusCode: 415,
      code: "ERR_UNSUPPORTED",
    });
  }

  static rangeNotSatisfiable(message: string) {
    return new CustomError({ message, statusCode: 416, code: "ERR_VALID" });
  }

  static expectationFailed(message: string) {
    return new CustomError({ message, statusCode: 417, code: "ERR_VALID" });
  }

  static imATeapot(message: string) {
    return new CustomError({ message, statusCode: 418, code: "ERR_VALID" });
  }

  static misdirectedRequest(message: string) {
    return new CustomError({ message, statusCode: 421, code: "ERR_VALID" });
  }

  static validation(message: string) {
    return new CustomError({ message, statusCode: 422, code: "ERR_VALID" });
  }

  static locked(message: string) {
    return new CustomError({ message, statusCode: 423, code: "ERR_FORBIDDEN" });
  }

  static failedDependency(message: string) {
    return new CustomError({ message, statusCode: 424, code: "ERR_VALID" });
  }

  static tooEarly(message: string) {
    return new CustomError({ message, statusCode: 425, code: "ERR_VALID" });
  }

  static upgradeRequired(message: string) {
    return new CustomError({ message, statusCode: 426, code: "ERR_VALID" });
  }

  static preconditionRequired(message: string) {
    return new CustomError({ message, statusCode: 428, code: "ERR_VALID" });
  }

  static tooManyRequests(message: string) {
    return new CustomError({ message, statusCode: 429, code: "ERR_LIMIT" });
  }

  static headerFieldsTooLarge(message: string) {
    return new CustomError({ message, statusCode: 431, code: "ERR_LIMIT" });
  }

  static legalReasons(message: string) {
    return new CustomError({ message, statusCode: 451, code: "ERR_FORBIDDEN" });
  }

  // --- 5xx Server Errors ---

  static internal(message: string) {
    return new CustomError({ message, statusCode: 500, code: "ERR_SERVER" });
  }

  static notImplemented(message: string) {
    return new CustomError({ message, statusCode: 501, code: "ERR_SERVER" });
  }

  static badGateway(message: string) {
    return new CustomError({ message, statusCode: 502, code: "ERR_SERVICE" });
  }

  static serviceUnavailable(message: string) {
    return new CustomError({ message, statusCode: 503, code: "ERR_SERVICE" });
  }

  static gatewayTimeout(message: string) {
    return new CustomError({ message, statusCode: 504, code: "ERR_SERVICE" });
  }

  static httpVersionNotSupported(message: string) {
    return new CustomError({ message, statusCode: 505, code: "ERR_SERVER" });
  }

  static variantAlsoNegotiates(message: string) {
    return new CustomError({ message, statusCode: 506, code: "ERR_SERVER" });
  }

  static insufficientStorage(message: string) {
    return new CustomError({ message, statusCode: 507, code: "ERR_SERVER" });
  }

  static loopDetected(message: string) {
    return new CustomError({ message, statusCode: 508, code: "ERR_SERVER" });
  }

  static notExtended(message: string) {
    return new CustomError({ message, statusCode: 510, code: "ERR_SERVER" });
  }

  static networkAuthRequired(message: string) {
    return new CustomError({ message, statusCode: 511, code: "ERR_AUTH" });
  }
}
