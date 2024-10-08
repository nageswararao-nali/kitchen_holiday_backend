
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('notifications')
export class NotificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  userId: string;

  @Column({default: false})
  isViewed: boolean;

  @Column({nullable: true})
  content: string;

  @Column({default: false})
  isForKitchen: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
