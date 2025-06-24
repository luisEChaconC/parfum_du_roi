import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Note } from "@entity/note.entity"

@Entity("notes")
export class NoteModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name!: string
  
  static fromDomain(note: Note): NoteModel {
    const ormEntity = new NoteModel();
    ormEntity.id = note.id;
    ormEntity.name = note.name;
    return ormEntity;    
  }

  toDomain(): Note {
    return new Note (
      this.id,
      this.name,
    )
  }
}
