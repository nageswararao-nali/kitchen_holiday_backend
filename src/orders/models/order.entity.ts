
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

  @Column({nullable: true})
  quantity: number;

  @Column({nullable: true})
  price: number;

  @Column({nullable: true})
  subItems: string;

  @Column({nullable: true})
  itemName: string;

  @Column({ type: 'date' })
  orderDate: string;

  @Column({ type: 'datetime' })
  orderDateTime: string;

  @Column({default: 'new'})
  status: string;

  @Column({default: 'normal'})
  orderType: string;

  @Column({default: 0})
  subscriptionId: number;

  @Column({default: 0})
  deliveryParterId: number;

  @Column({nullable: true})
  latitude: string;

  @Column({nullable: true})
  longitude: string;

  @Column({nullable: true})
  deliverySlot: string;

  @Column({default: 0})
  mySubId: number;

  @Column({nullable: true})
  invoice: string;

  @CreateDateColumn()
  created_at: Date;
}