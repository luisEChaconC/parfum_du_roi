export class Note {
  constructor(
    private _name: string,
    private _id?: string,
  ) {}

  public get id(): string | undefined {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
