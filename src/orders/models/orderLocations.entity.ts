
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, Point } from 'typeorm';

@Entity('order_locations')
export class OrderLocationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({nullable: true})
  latitude: string

  @Column({nullable: true})
  longitude: string

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;
}
