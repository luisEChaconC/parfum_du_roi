import { IErrorHandler } from "../interfaces/error-handler.interface";
import { ErrorResponse } from "../interfaces/error-response";

export class DefaultErrorHandler implements IErrorHandler<Error> {
  canHandle(error: Error): error is Error {
    return true; // Handles any error as fallback
  }

  handle(error: Error): ErrorResponse {
    return {
      statusCode: 500,
      body: {
        succes: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal Server Error",
          type: "InternalServerError"
        },
        timestamp: new Date().toISOString()
      }
    }
  }
}