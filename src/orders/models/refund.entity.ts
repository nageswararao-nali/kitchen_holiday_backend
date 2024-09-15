
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('refunds')
export class RefundsEntity {
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
  orderIds: string;

  @Column({nullable: true})
  itemName: string;

  @Column({nullable: true})
  refundRaisedDate: string;

  @Column({nullable: true})
  refundIssuedDate: string;

  @Column({default: false})
  approved: boolean;

  @Column({nullable: true})
  approved_by: string;

  @Column({default: 'processing'})
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
