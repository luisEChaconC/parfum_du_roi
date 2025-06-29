import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("users")
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  hashedPassword!: string;

  @Column()
  fullName!: string;
}