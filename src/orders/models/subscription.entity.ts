
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({default: 0})
  price: number;

  @Column({default: 1})
  days: number;

  @CreateDateColumn()
  created_at: Date;
}
