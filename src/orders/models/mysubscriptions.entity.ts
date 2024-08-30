
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('my-subscriptions')
export class MySubscriptionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  subId: number;

  @Column()
  subName: string;
  
  @Column()
  price: number;

  @Column()
  itemId: number;

  @Column()
  itemName: string;

  @Column({nullable: true})
  subItems: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({nullable: true})
  orderDates: string;

  @Column({default: 0})
  quantity: number;

  @Column({nullable: true})
  selectedPlan: string;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;
}
