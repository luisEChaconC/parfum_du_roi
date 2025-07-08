import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, Repository, In, EntityManager } from "typeorm";
import { PerfumeModel } from "@model/perfume.model";
import { NoteModel } from "@model/note.model";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { INoteRepository } from "@application/ports/repositories/note.repository.interface";
import { IImageRepository } from "@application/ports/repositories/image.repository.interface";
import { DatabaseError } from "@infrastructure/errors/database.error";
import { Note } from "@entity/note.entity";
import { ProductModel } from "@model/product.model";
import { TypeOrmProductRepository } from "./product.repository";
import { ImageModel } from "@model/image.model";
import { TypeOrmNoteRepository } from "./note.repository";
import { TypeOrmImageRepository } from "./image.repository";

@injectable()
export class TypeOrmPerfumeRepository {
  private readonly _perfumeRepository: Repository<PerfumeModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
    @inject(TYPES.TypeOrmProductRepository) private readonly _productRepository: TypeOrmProductRepository,
    @inject(TYPES.TypeOrmNoteRepository) private readonly _noteRepository: TypeOrmNoteRepository,
    @inject(TYPES.TypeOrmImageRepository) private readonly _imageRepository: TypeOrmImageRepository,
  ) {
    this._perfumeRepository = this._dataSource.getRepository(PerfumeModel);
  }

  async save(perfume: PerfumeModel): Promise<PerfumeModel> {
    const savedPerfumeModel = await this._perfumeRepository.save(perfume);
    return savedPerfumeModel;
  }

  async saveWithDependenciesTransaction(product: ProductModel, perfume: PerfumeModel): Promise<[ProductModel, PerfumeModel]> {
    try {
      return await this._dataSource.transaction(async (manager) => {
        const savedProduct = await this._productRepository.saveWithDependenciesInTransactionScope(product, manager);

        const topNotes = perfume.topNotes;
        const middleNotes = perfume.middleNotes;
        const baseNotes = perfume.baseNotes;
        
        perfume.topNotes = [];
        perfume.middleNotes = [];
        perfume.baseNotes = [];
        const savedPerfume = await this.saveInTransactionScope(perfume, manager);
        await this._noteRepository.bulkSaveInTransactionScope([...topNotes, ...middleNotes, ...baseNotes], manager);

        savedPerfume.topNotes = topNotes;
        savedPerfume.middleNotes = middleNotes;
        savedPerfume.baseNotes = baseNotes;
        const savedPerfumeWithNotes = await this.saveInTransactionScope(savedPerfume, manager);

        return [savedProduct, savedPerfumeWithNotes];
      });
    } catch (error) {
      console.log(error);
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError("Failed to save perfume with dependencies");
    }
  }

  async findByCategory(category: PerfumeCategory): Promise<[ProductModel, PerfumeModel][]> {
    try {
      const perfumes = await this._perfumeRepository.find({
        where: { category: category },
        relations: ["topNotes", "middleNotes", "baseNotes"],
      });

      const perfumeIds = perfumes.map((perfume) => perfume.id);
      const products = await this._productRepository.findByIds(perfumeIds);

      // Map product IDs to product models for quick pairing
      const productMap = new Map(products.map((product) => [product.id, product] as [string, ProductModel]));

      // Pair each perfume with its corresponding product
      const result: [ProductModel, PerfumeModel][] = perfumes
        .map((perfume) => {
          const product = productMap.get(perfume.id);
          return product ? ([product, perfume] as [ProductModel, PerfumeModel]) : undefined;
        })
        .filter((pair): pair is [ProductModel, PerfumeModel] => pair !== undefined);

      return result;
    } catch (error) {
      throw new DatabaseError("Failed to find perfumes by category");
    }
  }

  private async saveInTransactionScope(perfume: PerfumeModel, manager: EntityManager): Promise<PerfumeModel> {
    try {
      const savedPerfume = await manager.save(perfume);
      return savedPerfume;
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Failed to save perfume in transaction scope");
    }
  }
}