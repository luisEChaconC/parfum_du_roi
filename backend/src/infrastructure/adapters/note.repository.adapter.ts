import { inject, injectable } from "inversify";
import { TYPES } from "@composition/types";
import { INoteRepository } from "@application/ports/repositories/note.repository.interface";
import { TypeOrmNoteRepository } from "@infrastructure/persistence/typeorm/repositories/note.repository";
import { NoteMapper } from "@infrastructure/mappers/note.mapper";
import { Note } from "@domain/entities/note.entity";
import { EntityManager } from "typeorm";

@injectable()
export class NoteRepositoryAdapter implements INoteRepository {
  constructor(
    @inject(TYPES.TypeOrmNoteRepository)
    private readonly noteRepository: TypeOrmNoteRepository,
  ) {}
  async findByNames(names: string[]): Promise<Note[]> {
    const noteModels = await this.noteRepository.findByNames(names);
    return noteModels.map(noteModel => NoteMapper.toDomain(noteModel));
  }
} 