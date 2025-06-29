export class LogInRequestDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

