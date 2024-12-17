import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsGoal } from './savings-goal.entity';

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectRepository(SavingsGoal)
    private readonly savingsGoalRepository: Repository<SavingsGoal>,
  ) {}

  async createSavingsGoal(savingsGoalData: {
    userId: number;
    name: string;
    targetAmount: number;
    targetDate: string;
  }) {
    const savingsGoal = this.savingsGoalRepository.create({
      user: { id: savingsGoalData.userId },
      name: savingsGoalData.name,
      targetAmount: savingsGoalData.targetAmount,
      targetDate: new Date(savingsGoalData.targetDate),
    });
    return await this.savingsGoalRepository.save(savingsGoal);
  }

  async getSavingsGoals(userId: number) {
    return await this.savingsGoalRepository.find({
      where: { user: { id: userId } },
      order: { targetDate: 'ASC' },
    });
  }

  async updateSavingsGoal(
    id: number,
    updateData: { currentAmount?: number; achieved?: boolean },
  ) {
    const savingsGoal = await this.savingsGoalRepository.findOne({
      where: { id },
    });
    if (!savingsGoal) throw new Error('Savings goal not found');

    if (updateData.currentAmount !== undefined) {
      savingsGoal.currentAmount = updateData.currentAmount;
    }

    if (updateData.achieved !== undefined) {
      savingsGoal.achieved = updateData.achieved;
    }

    return await this.savingsGoalRepository.save(savingsGoal);
  }

  async deleteSavingsGoal(id: number) {
    const result = await this.savingsGoalRepository.delete({ id });
    if (result.affected === 0) throw new Error('Savings goal not found');
    return { message: 'Savings goal deleted successfully' };
  }
}
