import { randomUUID } from "crypto";

export class Note {
  constructor(
    private _name: string,
    private _id: string = randomUUID(),
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }
}
