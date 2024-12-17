import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('investments')
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('float')
  amountInvested: number;

  @Column('float', { nullable: true })
  currentValue: number;

  @Column('float', { nullable: true })
  returns: number;

  @Column({ nullable: true })
  purchaseDate: Date;

  @Column({ nullable: true })
  sellDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
