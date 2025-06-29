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
}


