import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, Repository, In } from "typeorm";
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

  async save(product: ProductModel, perfume: PerfumeModel): Promise<PerfumeModel> {
    const savedProductModel = await this._productRepository.save(product);

    perfume.id = savedProductModel.id;
    const savedPerfumeModel = await this._perfumeRepository.save(perfume);
    return savedPerfumeModel;
  }

  async saveWithDependenciesTransaction(product: ProductModel, perfume: PerfumeModel): Promise<[ProductModel, PerfumeModel]> {
    try {
      return await this._dataSource.transaction(async (manager) => {
        // Check if any images already exist
        const allImagePaths = product.images.map(image => image.path);
        
        if (allImagePaths.length > 0) {
          const imageRepository = manager.getRepository(ImageModel);
          const existingImages = await imageRepository.find({ 
            where: { path: In(allImagePaths) } 
          });
          
          if (existingImages.length > 0) {
            const existingPath = existingImages[0].path;
            throw new DatabaseError(`${existingPath} already exists`);
          }
        }

        // Check if any notes already exist and save new ones manually
        const allNoteNames = [
          ...perfume.topNotes.map(note => note.name),
          ...perfume.middleNotes.map(note => note.name),
          ...perfume.baseNotes.map(note => note.name)
        ];

        const noteRepository = manager.getRepository(NoteModel);
        const existingNotes = await noteRepository.find({
          where: { name: In(allNoteNames) }
        });
        const existingNotesMap = new Map(existingNotes.map(note => [note.name, note]));

        // Process and save notes manually
        const processNotes = async (notes: NoteModel[]): Promise<NoteModel[]> => {
          const processedNotes: NoteModel[] = [];
          for (const note of notes) {
            const existingNote = existingNotesMap.get(note.name);
            if (existingNote) {
              processedNotes.push(existingNote);
            } else {
              const savedNote = await noteRepository.save(note);
              existingNotesMap.set(note.name, savedNote); // Cache for other categories
              processedNotes.push(savedNote);
            }
          }
          return processedNotes;
        };

        perfume.topNotes = await processNotes(perfume.topNotes);
        perfume.middleNotes = await processNotes(perfume.middleNotes);
        perfume.baseNotes = await processNotes(perfume.baseNotes);

          // Create the product first
        const productRepository = manager.getRepository(ProductModel);
        const productToSave = { ...product };
        productToSave.images = []; // Remove images temporarily
        const savedProduct = await productRepository.save(productToSave);

        const imageRepository = manager.getRepository(ImageModel);
        for (const image of product.images) {
          image.product = savedProduct;
          await imageRepository.save(image);
        }

        // Create the perfume using the product's ID
        perfume.id = savedProduct.id;
        const perfumeRepository = manager.getRepository(PerfumeModel);
        const savedPerfume = await perfumeRepository.save(perfume);

        return [savedProduct, savedPerfume];
      });
    } catch (error) {
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
}