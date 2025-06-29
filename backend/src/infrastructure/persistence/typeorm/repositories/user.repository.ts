import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, Repository } from "typeorm";
import { UserModel } from "@model/user.models";
import { DatabaseError } from "@infrastructure/errors/database.error";

@injectable()
export class TypeOrmUserRepository {
  private readonly _userRepository: Repository<UserModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._userRepository = this._dataSource.getRepository(UserModel);
  }

  async save(userModel: UserModel): Promise<UserModel> {
    try {
      const savedUser = await this._userRepository.save(userModel);
      return savedUser;
    } catch (error) {
      throw new DatabaseError("Failed to save user");
    }
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    try {
      const user = await this._userRepository.findOne({ where: { email } });
      return user ?? null;
    } catch (error) {
      throw new DatabaseError("Failed to find user by email");
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const count = await this._userRepository.count({ where: { email } });
      return count > 0;
    } catch (error) {
      throw new DatabaseError("Failed to check if user email exists");
    }
  }
} 