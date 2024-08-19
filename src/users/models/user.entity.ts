
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({nullable: true})
  fName: string;

  @Column({nullable: true})
  lName: string;

  @Column()
  password: string;

  @Column({nullable: true})
  mobile: string;

  @Column({nullable: true})
  email: string;

  @Column({default: 'customer'})
  user_type: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
