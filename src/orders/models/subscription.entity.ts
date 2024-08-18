
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('subscriptions')
export class SubscriptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column({nullable: true})
  description: string;

  @Column({default: 0})
  price: number;

  @Column({default: 1})
  days: number;

  @Column({default: true})
  isVeg: boolean;

  @CreateDateColumn()
  created_at: Date;
}
