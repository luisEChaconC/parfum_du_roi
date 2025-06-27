import { Note } from "@domain/entities/note.entity";

export class NoteDto {
  constructor(
    public readonly name: string,
  ) {}

  static toDomain(noteDto: NoteDto): Note {
    return new Note(noteDto.name);
  }
}

