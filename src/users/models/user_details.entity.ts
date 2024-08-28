
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_details')
export class UserDetailsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @Column({nullable: true})
  name: string;

  @Column()
  password: string;

  @Column({nullable: true})
  mobile: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  skills: string;

  @Column({nullable: true})
  experience: string;
  
  @Column({nullable: true})
  age: string;

  @Column({nullable: true})
  availability: string;

  @Column({nullable: true})
  languages: string;

  @Column({nullable: true})
  aboutme: string;
}
