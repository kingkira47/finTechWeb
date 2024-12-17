import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @Column()
  message: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  submittedAt: Date;
}

@Entity('support_requests')
export class SupportRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column()
  contactEmail: string;

  @Column({ default: 'open' })
  status: string;

  @CreateDateColumn()
  submittedAt: Date;
}
