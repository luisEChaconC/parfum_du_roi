import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, In, Repository } from "typeorm";
import { ProductModel } from "@model/product.model";
import { DatabaseError } from "@infrastructure/errors/database.error";

@injectable()
export class TypeOrmProductRepository {
  private readonly _productRepository: Repository<ProductModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource
  ) {
    this._productRepository = this._dataSource.getRepository(ProductModel);
  }

  async save(product: ProductModel): Promise<ProductModel> {
    const savedProduct = await this._productRepository.save(product);
    return savedProduct;
  }

  async findById(id: string): Promise<ProductModel | null> {
    try {
      const product = await this._productRepository.findOne({ where: { id } });
      return product;
    } catch (error) {
      throw new DatabaseError("Failed to find product by id");
    }
  }

  async findByIds(ids: string[]): Promise<ProductModel[]> {
    try {
      const products = await this._productRepository.find({ where: { id: In(ids) } });
      return products;
    } catch (error) {
      throw new DatabaseError("Failed to find products by ids");
    }
  }

  async findAll(): Promise<ProductModel[]> {
    try {
      const products = await this._productRepository.find();
      return products;
    } catch (error) {
      throw new DatabaseError("Failed to find all products");
    }
  }

  async findByStockKeepingUnit(stockKeepingUnit: string): Promise<ProductModel | null> {
    try {
      const product = await this._productRepository.findOne({ where: { stockKeepingUnit } });
      return product;
    } catch (error) {
      throw new DatabaseError("Failed to find product by SKU");
    }
  }
} 