import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentController } from './investment.controller';
import { InvestmentService } from './investment.service';
import { Investment } from './investment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
