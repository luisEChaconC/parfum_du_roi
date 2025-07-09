import { Image } from "@domain/entities/image.entity";

export interface IImageRepository {
  save(image: Image, productId: string): Promise<void>;
} 