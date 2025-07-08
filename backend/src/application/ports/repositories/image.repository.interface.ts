import { Image } from "@domain/entities/image.entity";

export interface IImageRepository {
  findByPaths(paths: string[]): Promise<Image[]>;
} 