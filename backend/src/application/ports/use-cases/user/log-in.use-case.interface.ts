import { LogInRequestDto } from "@dto/user/log-in-request.dto";

export interface ILogInUseCase {
  executeAsync(requestDto: LogInRequestDto): Promise<string>;
}
