import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, Repository } from "typeorm";
import { CartModel } from "@model/cart.model";

@injectable()
export class TypeOrmCartRepository {
  private readonly _cartRepository: Repository<CartModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._cartRepository = this._dataSource.getRepository(CartModel);
  }

  async findByUserId(userId: string): Promise<CartModel | null> {
    return this._cartRepository.findOne({ where: { userId } });
  }
}
