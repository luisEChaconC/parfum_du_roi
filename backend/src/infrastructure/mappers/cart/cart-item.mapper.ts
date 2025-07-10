import { CartItem } from "@entity/cart-item.entity";
import { CartItemModel } from "@model/cart-item.model";
import { CartModel } from "@model/cart.model";
import { ProductModel } from "@model/product.model";
import { ProductMapper } from "../product.mapper";

export class CartItemMapper {

  static fromDomain(cartItemEntity: CartItem, cartModel: CartModel): CartItemModel {
    const productModel = ProductMapper.fromDomain(cartItemEntity.product);

    const cartItemModel = new CartItemModel();
    cartItemModel.product = productModel;
    cartItemModel.quantity = cartItemEntity.quantity;
    cartItemModel.cart = cartModel;

    return cartItemModel;
  }

  static toDomain(cartItemModel: CartItemModel): CartItem {
    const productEntity = ProductMapper.toDomain(cartItemModel.product);
    return new CartItem(
      productEntity,
      cartItemModel.quantity,
    );
  }
}
