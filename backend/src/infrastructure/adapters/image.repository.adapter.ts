import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IImageRepository } from "@port/repository/image.repository.interface";
import { TypeOrmImageRepository } from "@infrastructure/persistence/typeorm/repositories/image.repository";
import { ImageMapper } from "@infrastructure/mapper/image.mapper";
import { Image } from "@domain/entities/image.entity";

@injectable()
export class ImageRepositoryAdapter implements IImageRepository {
  constructor(
    @inject(TYPES.TypeOrmImageRepository) private readonly imageRepository: TypeOrmImageRepository,
  ) {}

  async findByPaths(paths: string[]): Promise<Image[]> {
    const imageModels = await this.imageRepository.findByPaths(paths);
    return imageModels.map(imageModel => ImageMapper.toDomain(imageModel));
  }
}
