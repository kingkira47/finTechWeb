import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('savings_goals')
export class SavingsGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  name: string;

  @Column('float')
  targetAmount: number;

  @Column('float', { default: 0 })
  currentAmount: number;

  @Column('date')
  targetDate: Date;

  @Column({ default: false })
  achieved: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
