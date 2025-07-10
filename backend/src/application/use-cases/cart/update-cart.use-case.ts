import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { IUpdateCartUseCase } from "@port/use-case/cart/update-cart.use-case.interface";
import { UpdateCartRequestDto, CartItemDto as CartItemRequestDto} from "@dto/cart/update-cart-request.dto";
import { UpdateCartResponseDto } from "@dto/cart/update-cart-response.dto";
import { CartItem } from "@entity/cart-item.entity";
import { IProductRepository } from "@port/repository/product.repository.interface";

@injectable()
export class UpdateCartUseCase implements IUpdateCartUseCase {
  constructor(
    @inject(TYPES.CartRepository) private readonly cartRepository: ICartRepository,
    @inject(TYPES.ProductRepository) private readonly productRepository: IProductRepository,
  ) {}

  async executeAsync(userId: string, dto: UpdateCartRequestDto): Promise<UpdateCartResponseDto> {
    const cartItems = await this.buildCartItems(dto.items);
    const cart = UpdateCartRequestDto.toDomain(dto, userId, cartItems);

    const savedCart = await this.cartRepository.update(cart);
    return UpdateCartResponseDto.fromDomain(savedCart);
  }
  
  async buildCartItems(items: CartItemRequestDto[]): Promise<CartItem[]> {
    for (const item of items) {
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${item.productId}. Quantity must be greater than 0.`);
      }
    }

    const productIds = items.map(item => item.productId);

    if (productIds.length === 0) {
      return [];
    }
    
    const foundProducts = await this.productRepository.findByIds(productIds);

    const foundProductsIds = foundProducts.map(p => p.id);
    const notFoundProductsIds = productIds.filter(id => !foundProductsIds.includes(id));

    if (notFoundProductsIds.length > 0) {
      throw new Error(`The following products were not found: ${notFoundProductsIds.join(", ")}`);
    }

    const cartItems: CartItem[] = [];

    for (const item of items) {
      const product = foundProducts.find(product => product.id === item.productId);
      if (!product) {
        // This case should not be reached due to the check above, but it's here for safety
        throw new Error(`Could not find product with id ${item.productId}`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`);
      }

      const cartItem = new CartItem(product, item.quantity);
      cartItems.push(cartItem);
    }

    return cartItems;
  }
}
