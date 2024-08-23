
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('delivery_slots')
export class DeliverySlotsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
  startTime: string;

  @Column({nullable: true})
  endTime: string;

  @Column({default: true})
  isActive: boolean;

  @CreateDateColumn({})
  created_at: Date;
}