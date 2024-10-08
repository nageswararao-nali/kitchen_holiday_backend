
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, Point } from 'typeorm';

@Entity('zones')
export class ZonesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  zipcode: string;

  @Column({default: true})
  isActive: string;

  @Column({nullable: true})
  latitude: string

  @Column({nullable: true})
  longitude: string

  // @Index({spatial: true})
  // @Column({type: 'geography',
  // spatialFeatureType: 'Point', 
  // srid: 4326,
  // nullable: true})
  // location: Point

  @Column({ type: 'point', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: string;

  @CreateDateColumn()
  created_at: Date;
}
