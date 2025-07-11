import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ProductMapper } from "@infrastructure/mapper/product.mapper";
import { IProductRepository } from "@port/repository/product.repository.interface";
import { Product } from "@entity/product.entity";
import { TypeOrmProductRepository } from "@typeorm/repositories/product.repository";

@injectable()
export class ProductRepositoryAdapter implements IProductRepository {
  constructor(
    @inject(TYPES.TypeOrmProductRepository) private readonly productRepository: TypeOrmProductRepository,
  ) {}

  async findByIds(ids: string[]): Promise<Product[]> {
    const productModels = await this.productRepository.findByIds(ids);
    return productModels.map(ProductMapper.toDomain);
  }
}
