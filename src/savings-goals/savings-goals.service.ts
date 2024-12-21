import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsGoal } from './savings-goal.entity';
import { CreateSavingsGoalDto } from './dto/create-savings-goal.dto';

@Injectable()
export class SavingsGoalService {
  constructor(
    @InjectRepository(SavingsGoal)
    private readonly savingsGoalRepository: Repository<SavingsGoal>,
  ) {}

  async createSavingsGoal(savingsGoalData: CreateSavingsGoalDto) {
    const savingsGoal = this.savingsGoalRepository.create({
      user: { id: savingsGoalData.userId },
      name: savingsGoalData.name,
      targetAmount: savingsGoalData.targetAmount,
      targetDate: new Date(savingsGoalData.targetDate),
    });
    await this.savingsGoalRepository.save(savingsGoal);

    return {
      message: `Savings goal created successfully. Savings goal id: ${savingsGoal.id}`,
    };
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
    if (!savingsGoal) {
      throw new BadRequestException('Savings goal not found');
    }

    if (updateData.currentAmount !== undefined) {
      savingsGoal.currentAmount = updateData.currentAmount;
    }

    if (updateData.achieved !== undefined) {
      savingsGoal.achieved = updateData.achieved;
    }

    await this.savingsGoalRepository.save(savingsGoal);

    return { message: 'Savings goal updated successfully' };
  }

  async deleteSavingsGoal(id: number) {
    const result = await this.savingsGoalRepository.delete({ id });
    if (result.affected === 0) {
      throw new BadRequestException('Savings goal not found');
    }
    return { message: 'Savings goal deleted successfully' };
  }
}
