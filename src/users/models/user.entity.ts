
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column({default: 'customer'})
  user_type: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;
}
