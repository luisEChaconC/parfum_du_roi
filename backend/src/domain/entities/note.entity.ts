export class Note {
  constructor(
    private _name: string,
  ) {}

  public get name(): string {
    return this._name;
  }
}
