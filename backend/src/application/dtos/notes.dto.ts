import { Notes } from "@domain/entities/perfume.entity";
import { NoteDto } from "./note.dto";

export class NotesDto {
  constructor(
    public readonly topNotes: NoteDto[],
    public readonly middleNotes: NoteDto[],
    public readonly baseNotes: NoteDto[],
  ) {}

  static toDomain(notesDto: NotesDto): Notes {
    return new Notes(
      notesDto.topNotes.map(noteDto => NoteDto.toDomain(noteDto)),
      notesDto.middleNotes.map(noteDto => NoteDto.toDomain(noteDto)),
      notesDto.baseNotes.map(noteDto => NoteDto.toDomain(noteDto)),
    );
  }
}

