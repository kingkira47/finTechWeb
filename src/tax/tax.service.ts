import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxRecord } from './tax.entity';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(TaxRecord)
    private readonly taxRepository: Repository<TaxRecord>,
  ) {}

  async estimateTax(taxData: {
    userId: number;
    annualIncome: number;
    deductions: number;
  }) {
    const taxRate = 0.25;
    const taxableIncome = taxData.annualIncome - taxData.deductions;
    const estimatedTax = Math.max(taxableIncome * taxRate, 0);

    const taxRecord = this.taxRepository.create({
      user: { id: taxData.userId },
      annualIncome: taxData.annualIncome,
      deductions: taxData.deductions,
      estimatedTax,
    });

    await this.taxRepository.save(taxRecord);

    return { taxableIncome, estimatedTax };
  }

  async getTaxRecords(userId: number) {
    return await this.taxRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
