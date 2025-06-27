export class Image {
  constructor(
    private _path: string,
    private _id?: string,
  ) {}

  public get id(): string | undefined {
    return this._id;
  }

  public get path(): string {
    return this._path;
  }
}
