import { Product } from "@entity/product.entity";
import { ProductModel } from "@model/product.model";
import { ImageMapper } from "./image.mapper";

export class ProductMapper {
  static fromDomain(product: Product): ProductModel {
    const productModel = new ProductModel();

    productModel.stockKeepingUnit = product.stockKeepingUnit;
    productModel.name = product.name;
    productModel.description = product.description;
    productModel.brand = product.brand;
    productModel.price = product.price;
    productModel.stock = product.stock;
    productModel.targetGender = product.targetGender;
    productModel.arrivalDate = product.arrivalDate;

    // Map image relationships
    productModel.images = product.images.map(imageEntity =>
      ImageMapper.fromDomain(imageEntity, productModel)
    );

    return productModel;
  }

  static toDomain(productModel: ProductModel): Product {
    // Map image relationships
    const domainImages = productModel.images?.map(imageModel =>
      ImageMapper.toDomain(imageModel)
    ) || [];

    return new Product(
      productModel.name,
      productModel.description,
      productModel.brand,
      productModel.price,
      productModel.stock,
      productModel.targetGender,
      domainImages,
      productModel.stockKeepingUnit,
      productModel.arrivalDate,
    );
  }
}

