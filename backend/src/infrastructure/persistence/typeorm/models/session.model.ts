import { Entity, Index, Column, PrimaryColumn } from 'typeorm';

@Entity("sessions")
export class SessionModel {
  @Index()
  @Column({
    type: 'bigint',
  })
  expiredAt!: number;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id!: string;

  @Column({
    type: 'text',
  })
  json!: string;
}