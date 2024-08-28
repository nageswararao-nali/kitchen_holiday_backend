
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zone_mapping')
export class ZoneMappingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({nullable: true})
  zipcodes: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}