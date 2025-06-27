import { InvalidUserDataError } from '../errors/invalid-user-data.error';

export class User {
  constructor(
    private _id: string,
    private _email: string,
    private _hashedPassword: string,
    private _fullName: string,
  ) {
    this.validateUserData(this._id, this._email, this._hashedPassword, this._fullName);
  }

  // Getters
  public get id(): string {
    return this._id;
  }

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

  // Private validation methods
  private validateUserData(
    id: string,
    email: string,
    hashedPassword: string,
    fullName: string,
  ): void {
    if (!id || id.trim().length === 0) {
      throw new InvalidUserDataError('User ID cannot be empty');
    }

    if (!this.isValidEmail(email)) {
      throw new InvalidUserDataError('Invalid email format');
    }

    if (!hashedPassword || hashedPassword.trim().length === 0) {
      throw new InvalidUserDataError('Hashed password cannot be empty');
    }

    if (!fullName || fullName.trim().length === 0) {
      throw new InvalidUserDataError('Full name cannot be empty');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }
}


