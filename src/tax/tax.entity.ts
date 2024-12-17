import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('tax_records')
export class TaxRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('float')
  annualIncome: number;

  @Column('float')
  estimatedTax: number;

  @Column('float')
  deductions: number;

  @Column('float', { nullable: true })
  finalTax: number;

  @CreateDateColumn()
  createdAt: Date;
}
