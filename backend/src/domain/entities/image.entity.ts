export class Image {
  constructor(
    private _path: string,
  ) {}

  public get path(): string {
    return this._path;
  }
}
