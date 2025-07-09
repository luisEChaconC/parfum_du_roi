import { Image } from "@entity/image.entity";
import { ImageModel } from "@model/image.model";
import { ProductModel } from "@model/product.model";

export class ImageMapper {
  static fromDomain(imageEntity: Image, productModel: ProductModel): ImageModel {
    const imageModel = new ImageModel();
    imageModel.path = imageEntity.path;
    imageModel.product = productModel;
    return imageModel;
  }

  static toDomain(imageModel: ImageModel): Image {
    return new Image(
      imageModel.path,
    );
  }
}