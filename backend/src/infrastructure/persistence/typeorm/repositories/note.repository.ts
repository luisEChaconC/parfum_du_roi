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

  async save(noteModel: NoteModel): Promise<NoteModel> {
    try {
      return await this._noteRepository.save(noteModel);
    } catch (error) {
      throw new DatabaseError("Failed to save note");
    }
  }

  async bulkSaveInTransactionScope(notes: NoteModel[], manager: EntityManager): Promise<void> {
    try {
      await manager.save(notes);
    } catch (error) {
      console.log(error);
      throw new DatabaseError("Failed to bulk save notes in transaction scope");
    }
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

  async findOrSaveInTransactionScope(noteModel: NoteModel, entityManager: EntityManager): Promise<NoteModel> {
    try {
      const existingNote = await entityManager.findOne(NoteModel, { where: { name: noteModel.name } });
      if (existingNote) {
        return existingNote;
      }
      return await entityManager.save(NoteModel, noteModel);
    } catch (error) {
      throw new DatabaseError("Failed to find or save note in transaction scope");
    }
  }
} 