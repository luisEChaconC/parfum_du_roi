import { CreateUserRequestDto } from "@dto/user/create-user-request.dto";
import { CreateUserResponseDto } from "@dto/user/create-user-response.dto";

export interface ICreateUserUseCase {
  executeAsync(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto>;
}