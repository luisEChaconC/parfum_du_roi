import { User } from "@entity/user.entity";
import { UserModel } from "@model/user.models";

export class UserMapper {
  static fromDomain(userEntity: User): UserModel {
    const userModel = new UserModel();
    if (userEntity.id) {
      userModel.id = userEntity.id;
    }
    userModel.email = userEntity.email;
    userModel.hashedPassword = userEntity.hashedPassword;
    userModel.fullName = userEntity.fullName;
    return userModel;
  }

  static toDomain(userModel: UserModel): User {
    return new User(
      userModel.email,
      userModel.hashedPassword,
      userModel.fullName,
      userModel.id,
    );
  }
} 