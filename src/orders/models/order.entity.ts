
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class OrdersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  addressId: number;

  @Column({nullable: true})
  customerName: string;

  @Column({nullable: true})
  customerMobile: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  itemId: number;

  @Column({nullable: true})
  totalAmount: number;

  @Column({ type: 'date' })
  orderDate: string;

  @Column({ type: 'datetime' })
  orderDateTime: string;

  @Column({default: 'new'})
  status: string;

  @Column({default: 'normal'})
  orderType: string;

  @CreateDateColumn()
  created_at: Date;
}
