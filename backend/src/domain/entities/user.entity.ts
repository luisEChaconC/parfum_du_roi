import { InvalidUserDataError } from '../errors/invalid-user-data.error';

export class User {
  constructor(
    private _email: string,
    private _hashedPassword: string,
    private _fullName: string,
  ) {}

  // Getters
  
  public get email(): string {
    return this._email;
  }

  public get hashedPassword(): string {
    return this._hashedPassword;
  }

  public get fullName(): string {
    return this._fullName;
  }

  // Business Methods

  public updatePassword(newHashedPassword: string): void {
    if (!newHashedPassword || newHashedPassword.trim().length === 0) {
      throw new InvalidUserDataError('Hashed password cannot be empty');
    }
    this._hashedPassword = newHashedPassword;
  }

  public updateFullName(newFullName: string): void {
    if (!newFullName || newFullName.trim().length === 0) {
      throw new InvalidUserDataError('Full name cannot be empty');
    }
    this._fullName = newFullName.trim();
  }
}


