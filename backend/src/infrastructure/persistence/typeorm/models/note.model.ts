import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Note } from "@entity/note.entity"

@Entity("notes")
export class NoteModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  name!: string
}
