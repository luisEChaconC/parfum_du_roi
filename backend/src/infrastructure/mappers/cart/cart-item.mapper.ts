import { CartItem } from "@entity/cart-item.entity";
import { CartItemModel } from "@model/cart-item.model";
import { CartModel } from "@model/cart.model";
import { ProductModel } from "@model/product.model";

export class CartItemMapper {

  static fromDomain(cartItemEntity: CartItem, cartModel: CartModel): CartItemModel {
    const productModel = new ProductModel();
    productModel.stockKeepingUnit = cartItemEntity.productStockKeepingUnit;

    const cartItemModel = new CartItemModel();
    cartItemModel.product = productModel;
    cartItemModel.quantity = cartItemEntity.quantity;
    cartItemModel.cart = cartModel;

    return cartItemModel;
  }

  static toDomain(cartItemModel: CartItemModel): CartItem {
    return new CartItem(
      cartItemModel.product.stockKeepingUnit,
      cartItemModel.product.name,
      cartItemModel.quantity,
      cartItemModel.product.price,
    );
  }
}
