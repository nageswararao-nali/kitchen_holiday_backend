
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  image: string;

  @Column()
  category: number;

  @Column({default: true})
  isVeg: boolean

  @Column({})
  price: number

  @Column({ type: 'timestamp' })
  created_at: Date;
}