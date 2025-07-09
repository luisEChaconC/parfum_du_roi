import { Note } from "@entity/note.entity";
import { NoteModel } from "@model/note.model";


export class NoteMapper {
  static fromDomain(noteEntity: Note): NoteModel {
    const noteModel = new NoteModel();
    noteModel.name = noteEntity.name;
    return noteModel;
  }

  static toDomain(noteModel: NoteModel): Note {
    return new Note (
      noteModel.name,
    );
  }
}