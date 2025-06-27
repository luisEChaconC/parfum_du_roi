import { Product } from "@entity/product.entity"
import { Note } from "@entity/note.entity"
import { Image } from "@entity/image.entity"
import { PerfumeCategory } from "@domain/enums/perfume-category.enum"
import { PerfumeConcentration } from "@domain/enums/perfume-concentration.enum"
import { Gender } from "@domain/enums/gender.enum"

export class Notes {
  constructor(
    public topNotes: Note[],
    public middleNotes: Note[],
    public baseNotes: Note[],
  ) {}
}

export class Perfume extends Product {
  constructor(
    stockKeepingUnit: string,
    name: string,
    description: string,
    brand: string,
    price: number,
    stock: number,
    targetGender: Gender,
    images: Image[],
    arrivalDate: Date,
    private _concentration: PerfumeConcentration,
    private _category: PerfumeCategory,
    private _notes: Notes,
  ) {
    super(stockKeepingUnit, name, description, brand, price, stock, targetGender, images, arrivalDate);
  }

  public get concentration(): PerfumeConcentration {
    return this._concentration;
  }

  public get category(): PerfumeCategory {
    return this._category;
  }

  public get notes(): Notes {
    return this._notes;
  }
}
