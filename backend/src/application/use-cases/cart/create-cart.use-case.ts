import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { ICreateCartUseCase } from "@port/use-case/cart/create-cart.use-case.interface";
import { CreateCartRequestDto, CartItemDto as CartItemRequestDto} from "@application/dtos/cart/create-cart-request.dto";
import { CreateCartResponseDto } from "@application/dtos/cart/create-cart-response.dto";
import { CartItem } from "@entity/cart-item.entity";
import { IProductRepository } from "@port/repository/product.repository.interface";

@injectable()
export class CreateCartUseCase implements ICreateCartUseCase {
  constructor(
    @inject(TYPES.CartRepository) private readonly cartRepository: ICartRepository,
    @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
  ) {}

  async executeAsync(userId: string, dto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
    const cartItems = await this.buildCartItems(dto.items);
    const cart = CreateCartRequestDto.toDomain(dto, userId, cartItems);

    const savedCart = await this.cartRepository.saveOrReplace(cart);
    return CreateCartResponseDto.fromDomain(savedCart);
  }
  
  async buildCartItems(items: CartItemRequestDto[]): Promise<CartItem[]> {
    const productIds = items.map(item => item.productId);
    const foundProducts = await this.productRepository.findByIds(productIds);

    const foundProductsIds = foundProducts.map(p => p.id);
    const notFoundProductsIds = productIds.filter(id => !foundProductsIds.includes(id));

    if (notFoundProductsIds.length > 0) {
      throw new Error(`Could not find products with ids ${notFoundProductsIds.join(", ")}`);
    }

    const cartItems: CartItem[] = [];

    for (const item of items) {
      const product = foundProducts.find(product => product.id === item.productId);
      if (!product) {
        throw new Error(`Could not find product with id ${item.productId}`);
      }

      const cartItem = new CartItem(product, item.quantity);
      cartItems.push(cartItem);
    }

    return cartItems;
  }
}
