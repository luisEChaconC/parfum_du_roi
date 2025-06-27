import { ErrorResponse } from "./error-response";

export interface IErrorHandler<T extends Error> {
  canHandle(error: Error): error is T;
  handle(error: T): ErrorResponse;
}