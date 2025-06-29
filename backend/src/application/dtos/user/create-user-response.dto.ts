import { User } from "@entity/user.entity";

export class CreateUserResponseDto {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string,
  ) {}

  static fromDomain(user: User): CreateUserResponseDto {
    if (!user.id) {
      throw new Error("User id is undefined in CreateUserResponseDto.fromDomain");
    }
    return new CreateUserResponseDto (
      user.id,
      user.email,
      user.fullName,
    );
  }
}