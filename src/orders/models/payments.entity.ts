
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class PaymentsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  userId: string;

  @Column({nullable: true})
  customerName: string;

  @Column({nullable: true})
  customerMobile: string;

  @Column({nullable: true})
  customerEmail: string;

  @Column()
  amount: number;

  @Column({nullable: true})
  orderId: number;

  @Column({nullable: true})
  itemName: string;

  @Column({default: false})
  isSubscribe: boolean;

  @Column({nullable: true})
  paymentDate: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
