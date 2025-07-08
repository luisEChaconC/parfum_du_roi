import { randomUUID } from "crypto"
import { Image } from "@domain/entities/image.entity"
import { Gender } from "@domain/enums/gender.enum"

export class Product {
  constructor(
    private _name: string,
    private _description: string,
    private _brand: string,
    private _price: number,
    private _stock: number,
    private _targetGender: Gender,
    private _images: Image[],
    private _id: string = randomUUID(),
  ) {}

  // Getters

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get brand(): string {
    return this._brand;
  }

  public get targetGender(): Gender {
    return this._targetGender;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): number {
    return this._price;
  }

  public get stock(): number {
    return this._stock;
  }

  public get images(): Image[] {
    return this._images;
  }
}
