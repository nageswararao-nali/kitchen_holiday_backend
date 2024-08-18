
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sub_items')
export class SubItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  image: string;

  @Column({default: 0})
  quantity: number;

  @Column({default: 0})
  price: number

  @Column({default: true})
  isVeg: boolean

  @Column({ type: 'timestamp' })
  created_at: Date;
}