import { EntityManager } from "typeorm";
import { Note } from "@domain/entities/note.entity";
 
export interface INoteRepository {
  findByNames(names: string[]): Promise<Note[]>;
} 