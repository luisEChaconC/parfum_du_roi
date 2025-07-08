import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ImageModel } from "@model/image.model";
import { Image } from "@entity/image.entity";
import { IImageRepository } from "@application/ports/repositories/image.repository.interface";
import { DatabaseError } from "@infrastructure/errors/database.error";
import { DataSource, EntityManager, In } from "typeorm";
import { ProductModel } from "@model/product.model";
@injectable()
export class TypeOrmImageRepository {
  private readonly _imageRepository;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._imageRepository = this._dataSource.getRepository(ImageModel);
  }

  async bulkSaveInTransactionScope(images: ImageModel[], entityManager: EntityManager): Promise<ImageModel[]> {
    try {
      const savedImages = await entityManager.save(images);
      return savedImages;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Failed to bulk save images in transaction scope");
    }
  }

  async findByPaths(paths: string[]): Promise<ImageModel[]> {
    try {
      const images = await this._imageRepository.find({ where: { path: In(paths) } });
      return images;
    } catch (error) {
      throw new DatabaseError("Failed to find images by paths");
    }
  }

  async findByPathsInTransactionScope(paths: string[], entityManager: EntityManager): Promise<ImageModel[]> {
    try {
      const images = await entityManager.find(ImageModel, { where: { path: In(paths) } });
      return images;
    } catch (error) {
      throw new DatabaseError("Failed to find images by paths in transaction scope");
    }
  }

  async pathExists(path: string): Promise<boolean> {
    try {
      const image = await this._imageRepository.findOne({ where: { path } });
      return !!image;
    } catch (error) {
      throw new DatabaseError("Failed to check if image path exists");
    }
  }

  async saveInTransactionScope(image: ImageModel, entityManager: EntityManager): Promise<ImageModel> {
    const savedImageModel = await entityManager.save(image);
    return savedImageModel;
  }
} 