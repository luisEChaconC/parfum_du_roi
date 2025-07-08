import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { ProductModel } from "@model/product.model";
import { DatabaseError } from "@infrastructure/errors/database.error";
import { TypeOrmImageRepository } from "./image.repository";

@injectable()
export class TypeOrmProductRepository {
  private readonly _productRepository: Repository<ProductModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
    @inject(TYPES.TypeOrmImageRepository) private readonly _imageRepository: TypeOrmImageRepository,
  ) {
    this._productRepository = this._dataSource.getRepository(ProductModel);
  }

  async save(product: ProductModel): Promise<ProductModel> {
    const savedProduct = await this._productRepository.save(product);
    return savedProduct;
  }

  async saveWithDependenciesInTransactionScope(product: ProductModel, entityManager: EntityManager): Promise<ProductModel> {
    try {
      const savedProduct = await entityManager.save(product);
      await this._imageRepository.bulkSaveInTransactionScope(product.images, entityManager);
      return savedProduct;
    } catch (error) {
      console.log(error);
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError("Failed to save product with dependencies in transaction scope");
    }
  }

  async findById(id: string): Promise<ProductModel | null> {
    try {
      const product = await this._productRepository.findOne({
        where: { id },
        relations: ["images"],
      });
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
} 