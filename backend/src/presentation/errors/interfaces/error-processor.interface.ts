import  { ErrorResponse } from "./error-response"

export interface IErrorProcessor {
  process(error: Error): ErrorResponse;
}