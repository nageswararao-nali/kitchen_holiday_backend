
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({nullable: true})
  fName: string;

  @Column({nullable: true})
  lName: string;

  @Column({nullable: true})
  mobile: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  address1: string;

  @Column({nullable: true})
  latitude: string;

  @Column({nullable: true})
  longitude: string;

  @Column({nullable: true})
  city: string;

  @Column({nullable: true})
  zipcode: string;

  @Column({ default: true })
  isDefault: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
