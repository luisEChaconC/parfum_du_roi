import { Cart } from "@entity/cart.entity";
import { CartModel } from "@model/cart.model";
import { CartItemMapper } from "./cart-item.mapper";

export class CartMapper {
  static fromDomain(cartEntity: Cart): CartModel {
    const cartModel = new CartModel();
    cartModel.userId = cartEntity.userId;
    cartModel.items = cartEntity.items.map((item) => CartItemMapper.fromDomain(item, cartModel));
    return cartModel;
  }

  static toDomain(cartModel: CartModel): Cart {
    const cartEntity = new Cart(
      cartModel.userId,
      cartModel.items.map((item) => CartItemMapper.toDomain(item)),
    );
    return cartEntity;
  }
}