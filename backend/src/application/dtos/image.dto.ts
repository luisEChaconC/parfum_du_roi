import { Image } from "@domain/entities/image.entity";

export class ImageDto {
  constructor(
    public readonly path: string,
  ) {}

  static toDomain(imageDto: ImageDto): Image {
    return new Image(imageDto.path);
  }
}
