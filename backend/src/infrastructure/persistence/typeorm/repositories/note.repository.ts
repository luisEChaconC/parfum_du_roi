import { injectable, inject } from "inversify";
import { DataSource, EntityManager, In, Repository } from "typeorm";
import { TYPES } from "@composition/types";
import { NoteMapper } from "@infrastructure/mapper/note.mapper";
import { NoteModel } from "@model/note.model";
import { Note } from "@entity/note.entity";
import { DatabaseError } from "@infrastructure/errors/database.error";

@injectable()
export class TypeOrmNoteRepository {
  private readonly _noteRepository: Repository<NoteModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._noteRepository = this._dataSource.getRepository(NoteModel);
  }

  async findByName(name: string): Promise<NoteModel | null> {
    try {
      const note = await this._noteRepository.findOne({
        where: { name: name }
      });
      return note ?? null;
    } catch (error) {
      throw new DatabaseError("Failed to find note by name");
    }
  }

  async findByNames(names: string[]): Promise<NoteModel[]> {
    try {
      const notes = await this._noteRepository.find({
        where: { name: In(names) }
      });
      return notes;
    } catch (error) {
      throw new DatabaseError("Failed to find notes by names");
    }
  }

  async findByNamesInTransactionScope(names: string[], entityManager: EntityManager): Promise<NoteModel[]> {
    try {
      const notes = await entityManager.find(NoteModel, { where: { name: In(names) } });
      return notes;
    } catch (error) {
      throw new DatabaseError("Failed to find notes by names in transaction scope");
    }
  }
} 