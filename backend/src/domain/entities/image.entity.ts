import { randomUUID } from "crypto";

export class Image {
  constructor(
    private _path: string,
    private _id: string = randomUUID(),
  ) {}

  public get id(): string {
    return this._id;
  }

  public get path(): string {
    return this._path;
  }
}
