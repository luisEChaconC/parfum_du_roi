import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ImageModel } from "@model/image.model";
import { Image } from "@entity/image.entity";
import { IImageRepository } from "@application/ports/repositories/image.repository.interface";
import { DatabaseError } from "@infrastructure/errors/database.error";
import { DataSource, EntityManager, In } from "typeorm";

@injectable()
export class TypeOrmImageRepository implements IImageRepository {
  private readonly _imageRepository;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._imageRepository = this._dataSource.getRepository(ImageModel);
  }

  async save(image: Image, productId: string): Promise<void> {
    try {
    const imageModel = ImageModel.fromDomain(image);
      imageModel.product = { id: productId } as any; // TypeORM will handle the relation
    await this._imageRepository.save(imageModel);
    } catch (error) {
      throw new DatabaseError("Failed to save image");
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