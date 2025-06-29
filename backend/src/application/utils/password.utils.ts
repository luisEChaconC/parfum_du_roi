import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class PasswordUtils {
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordUtils;