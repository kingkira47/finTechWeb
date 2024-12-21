import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaxRecord } from './tax.entity';
import { EstimateTaxDto } from './dto/estimate-tax.dto';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(TaxRecord)
    private readonly taxRepository: Repository<TaxRecord>,
  ) {}

  async estimateTax(taxData: EstimateTaxDto) {
    if (taxData.annualIncome < 0) {
      return `Annual income cannot be negative`;
    }

    let estimatedTax = 0;
    let taxableIncome = 0;
    if (taxData.annualIncome > 350000 && taxData.annualIncome <= 450000) {
      taxableIncome = taxData.annualIncome - 350000;
      estimatedTax = taxableIncome * 0.05;
    } else if (
      taxData.annualIncome > 450000 &&
      taxData.annualIncome <= 750000
    ) {
      taxableIncome = taxData.annualIncome - 350000;
      estimatedTax = 5000 + (taxableIncome - 100000) * 0.1;
    } else if (
      taxData.annualIncome > 750000 &&
      taxData.annualIncome <= 1150000
    ) {
      taxableIncome = taxData.annualIncome - 350000;
      estimatedTax = 5000 + 30000 + (taxableIncome - 400000) * 0.15;
    } else if (
      taxData.annualIncome > 1150000 &&
      taxData.annualIncome <= 1650000
    ) {
      taxableIncome = taxData.annualIncome - 350000;
      estimatedTax = 5000 + 30000 + 60000 + (taxableIncome - 800000) * 0.2;
    } else if (taxData.annualIncome > 1650000) {
      taxableIncome = taxData.annualIncome - 350000;
      estimatedTax =
        5000 + 30000 + 60000 + 100000 + (taxableIncome - 1300000) * 0.25;
    }

    const taxRecord = this.taxRepository.create({
      user: { id: taxData.userId },
      annualIncome: taxData.annualIncome,
      taxableIncome,
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
