import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investment.entity';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  async addInvestment(investmentData: {
    userId: number;
    type: string;
    name: string;
    amountInvested: number;
    purchaseDate?: string;
  }) {
    const investment = this.investmentRepository.create({
      user: { id: investmentData.userId },
      type: investmentData.type,
      name: investmentData.name,
      amountInvested: investmentData.amountInvested,
      purchaseDate: investmentData.purchaseDate
        ? new Date(investmentData.purchaseDate)
        : undefined,
    });
    return await this.investmentRepository.save(investment);
  }

  async getInvestments(userId: number) {
    return await this.investmentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async updateInvestment(
    id: number,
    updateData: { currentValue?: number; returns?: number; sellDate?: string },
  ) {
    const investment = await this.investmentRepository.findOne({
      where: { id },
    });
    if (!investment) throw new Error('Investment not found');

    if (updateData.currentValue !== undefined) {
      investment.currentValue = updateData.currentValue;
    }

    if (updateData.returns !== undefined) {
      investment.returns = updateData.returns;
    }

    if (updateData.sellDate !== undefined) {
      investment.sellDate = new Date(updateData.sellDate);
    }

    return await this.investmentRepository.save(investment);
  }

  async deleteInvestment(id: number) {
    const result = await this.investmentRepository.delete({ id });
    if (result.affected === 0) throw new Error('Investment not found');
    return { message: 'Investment deleted successfully' };
  }
}
