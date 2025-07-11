import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICreateUserUseCase } from "@port/use-case/user/create-user.use-case.interface";
import { IUserRepository } from "@application/ports/repositories/user.repository.interface";
import { CreateUserRequestDto } from "@application/dtos/user/create-user-request.dto";
import { CreateUserResponseDto } from "@dto/user/create-user-response.dto";
import PasswordUtils from "@application/utils/password.utils";
import { ICartRepository } from "@port/repository/cart.repository.interface";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository,
    @inject(TYPES.CartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async executeAsync(requestDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const emailExists = await this.userRepository.existsByEmail(requestDto.email);
    if (emailExists) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await PasswordUtils.hashPassword(requestDto.password);
    const user = CreateUserRequestDto.toDomain(requestDto, hashedPassword);
    const savedUser = await this.userRepository.save(user);
    await this.cartRepository.createEmptyCart(savedUser.id);

    return CreateUserResponseDto.fromDomain(savedUser);
  }
}