import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsGoalController } from './savings-goals.controller';
import { SavingsGoalService } from './savings-goals.service';
import { SavingsGoal } from './savings-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingsGoal])],
  controllers: [SavingsGoalController],
  providers: [SavingsGoalService],
})
export class SavingsGoalModule {}
