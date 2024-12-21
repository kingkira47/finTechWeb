import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investment.entity';
import { AddInvestmentDto } from './dto/add-investment.dto';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {}

  async addInvestment(investmentData: AddInvestmentDto) {
    const investment = this.investmentRepository.create({
      user: { id: investmentData.userId },
      type: investmentData.type,
      name: investmentData.name,
      amountInvested: investmentData.amountInvested,
      purchaseDate: investmentData.purchaseDate
        ? new Date(investmentData.purchaseDate)
        : undefined,
    });
    await this.investmentRepository.save(investment);

    return {
      message: `Investment added successfully. Investment ID: ${investment.id}`,
    };
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
    if (!investment) {
      throw new BadRequestException('Investment not found');
    }

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
    if (result.affected === 0) {
      throw new BadRequestException('Investment not found');
    }
    return { message: 'Investment deleted successfully' };
  }
}
