  import { User } from "@entity/user.entity";

  export class CreateUserRequestDto {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly fullName: string,
    ) {}

  public static toDomain(requestDto: CreateUserRequestDto, hashedPassword: string): User {
      return new User(
        requestDto.email,
        hashedPassword,
        requestDto.fullName,
      );
    }
  }
