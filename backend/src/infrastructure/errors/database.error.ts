import { InfrastructureError } from "./infrastructure.error";

export class DatabaseError extends InfrastructureError{
  constructor(message: string = "Database error occurred") {
    super(message);
  }
}