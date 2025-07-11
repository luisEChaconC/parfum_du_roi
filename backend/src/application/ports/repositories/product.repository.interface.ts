import { Product } from "@entity/product.entity";

export interface IProductRepository {
  findByIds(ids: string[]): Promise<Product[]>;
}