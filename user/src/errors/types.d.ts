type ErrorCode =
  | "ERR_NF" // Not Found
  | "ERR_VALID" // Validation/Bad Request
  | "ERR_AUTH" // Unauthorized
  | "ERR_FORBIDDEN" // Forbidden
  | "ERR_CONFLICT" // Conflict
  | "ERR_SERVER" // Internal Server Error
  | "ERR_TIMEOUT" // Request Timeout
  | "ERR_LIMIT" // Rate Limit / Payload Too Large
  | "ERR_UNSUPPORTED" // Unsupported Media Type
  | "ERR_SERVICE"; // Service Unavailable / Gateway Error

type ValidationError = {
  error: {
    message: string;
    code: ErrorCode;
    errors: { message: string }[];
  };
};
