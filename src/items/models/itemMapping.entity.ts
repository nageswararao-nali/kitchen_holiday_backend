
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item_mapping')
export class ItemMappingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: string;

  @Column({nullable: true})
  subItemIds: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}