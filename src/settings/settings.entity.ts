import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ default: 'BDT' })
  currency: string;

  @Column({ default: 'light' })
  theme: string;

  @Column({ default: 'bn' })
  language: string;

  @Column({ default: 'BST' })
  timeZone: string;

  @Column('boolean', { default: true })
  notificationsEnabled: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
