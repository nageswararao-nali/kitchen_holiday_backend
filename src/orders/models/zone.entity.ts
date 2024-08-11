
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('zones')
export class ZonesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({default: true})
  isActive: string;

  @Column({nullable: true})
  coordinates: string;

  @CreateDateColumn()
  created_at: Date;
}
