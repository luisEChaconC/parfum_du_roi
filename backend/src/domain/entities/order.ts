import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  amount!: number;

  @Column()
  status!: string;

  @Column()
  stripePaymentIntentId!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
