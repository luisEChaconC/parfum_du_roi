import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ILogInUseCase } from "@port/use-case/user/log-in.use-case.interface";
import { IUserRepository } from "@port/repository/user.repository.interface";
import { LogInRequestDto } from "@dto/user/log-in-request.dto";
import PasswordUtils from "@application/utils/password.utils";

@injectable()
export class LogInUseCase implements ILogInUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async executeAsync(requestDto: LogInRequestDto): Promise<string> {
    const user = await this.userRepository.findByEmail(requestDto.email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await PasswordUtils.verifyPassword(requestDto.password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    if (!user.id) {
      throw new Error("User ID not found after successful login");
    }

    return user.id;
  }
}