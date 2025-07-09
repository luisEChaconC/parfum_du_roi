import { EntityManager } from "typeorm";
import { Note } from "@domain/entities/note.entity";
 
export interface INoteRepository {
  save(note: Note): Promise<Note>;
  findByName(name: string): Promise<Note | null>;

  findOrSaveInTransactionScope(note: Note, entityManager: EntityManager): Promise<Note>;
} 