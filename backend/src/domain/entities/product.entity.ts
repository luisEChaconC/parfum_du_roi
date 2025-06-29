import { Image } from "@domain/entities/image.entity"
import { Gender } from "@domain/enums/gender.enum"
import { randomUUID } from 'crypto'

export class Product {
  constructor(
    private _name: string,
    private _description: string,
    private _brand: string,
    private _price: number,
    private _stock: number,
    private _targetGender: Gender,
    private _images: Image[],
    private _stockKeepingUnit: string = this.generateStockKeepingUnit(),
    private _arrivalDate: Date = new Date(),
  ) {}

  // Getters

  public get stockKeepingUnit(): string {
    return this._stockKeepingUnit;
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

  public get arrivalDate(): Date {
    return this._arrivalDate;
  }

  // Business Methods

  private generateStockKeepingUnit(): string {
    return randomUUID().replace(/-/g, '').substring(0, 20).toUpperCase();
  }
}
