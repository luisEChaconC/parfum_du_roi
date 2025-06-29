import { inject, injectable } from "inversify";
import { TYPES } from "@composition/types";
import { IUserRepository } from "@port/repository/user.repository.interface";
import { TypeOrmUserRepository } from "@infrastructure/persistence/typeorm/repositories/user.repository";
import { UserMapper } from "@infrastructure/mapper/user.mapper";
import { User } from "@entity/user.entity";

@injectable()
export class UserRepositoryAdapter implements IUserRepository {
  constructor(
    @inject(TYPES.TypeOrmUserRepository)
    private readonly userRepository: TypeOrmUserRepository,
  ) {}

  async save(user: User): Promise<User> {
    const userModel = UserMapper.fromDomain(user);
    const savedUserModel = await this.userRepository.save(userModel);
    return UserMapper.toDomain(savedUserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await this.userRepository.findByEmail(email);
    return userModel ? UserMapper.toDomain(userModel) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsByEmail(email);
  }
}
